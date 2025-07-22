import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import {
  catchError,
  firstValueFrom,
  map,
  Observable,
  of,
  Subject,
  throwError,
} from "rxjs";
import { CONFIG } from "../../../config";
declare var $: any;
@Injectable({
  providedIn: "root",
})
export class NetworkService {
  public loggedUserData: any;
  private fancyChange = new Subject<any>();
  private deletedMarket = new Subject<any>();
  private betPlaceObj = new Subject<any>();
  private betslipOpened = new Subject<any>();
  private userBalance = new Subject<any>();
  private roundData = new Subject<string>();
  private resultData = new Subject<string>();



  private streamData: any = {};
  constructor(
    private http: HttpClient,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.loggedUserData = JSON.parse(
      localStorage.getItem("userDetail") as string
    );
  }
  //  getAllRecordsByPost(url: any, params: any) {
  //   return this.http.post<any>(url, params)
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }

  getAllRecordsByPostOld(url: any, params: any) {
    return this.http.post<any>(url, params).pipe(
      map((data) => {
        return data;
      })
    );
  }

  async getAllRecordsByPost(
    url: string,
    params: any
  ): Promise<ResponseType | undefined> {
    try {
      const data = await firstValueFrom(
        this.http.post<ResponseType>(url, params)
      );
      return data;
    } catch (error: any) {
      // Handle error as needed
      this.ErrorNotification_Manager(error?.error);
      // console.error('Error in getAllRecordsByPost:', error);
      // Return undefined or handle the error gracefully
      return undefined;
    }
  }
  gotoAviator() {
    let avres = {
      eventId: "88.0022",
      eventName: "Vimaan",
      menuId: "2",
      menuName: "Vimaan",
      link: "https://{$domain}/authentication/{$token}/{$eventId}",
      popular: true,
      sequence: 2,
      companyName: "UNIVERSE",
      room: "asian",
    };

    let token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(["/login"]);
      return;
    }

    let domain = window.location.hostname

    let isTokenString = avres.link.includes('{$token}');
    if (isTokenString && avres.companyName == 'UNIVERSE') {
      let finalLinkWithToken = avres.link.replace('{$token}', token);
      let finalUrl = finalLinkWithToken.replace('{$eventId}', avres?.eventId);
      let finalUrlwithDomain = finalUrl.replace("{$domain}", 'casino.'+domain);
      let trim_host = finalUrlwithDomain.replace("www.", '');
      // console.log('final output',finalUrl)
      window.location.href = trim_host;``;
      return;
    }
  }
  getAllRecordsByGet(url: any, params: any) {
    return this.http.get<any>(url, params).pipe(
      map((data) => {
        return data;
      })
    );
  }
  showWelcomeModal() {
    const modal = document.getElementById("WelcomeImageModal");
    if (modal) {
      $("#WelcomeImageModal").modal("show");
    }
  }
  gotoMarket(event: any) {
    let token = localStorage.getItem("token");

    if (event.exEventId == "99.0062") {
      if (!token) {
        let url = "/login";
        this.router.navigateByUrl(url);
        return;
      }

      // console.log('window.location',window.location.protocol)
      // console.log('window.location',window.location.host)

      // https://casino.betever365.com/authentication/{$token}/{$eventId}
      let finalLinkWithToken =
        window.location.protocol +
        "//casino." +
        window.location.host +
        "/authentication/" +
        token +
        "/" +
        event.exEventId;
      // let finalUrl = finalLinkWithToken.replace("{$eventId}", event?.exEventId);
      // console.log('final output',finalUrl)
      window.location.href = finalLinkWithToken;
      ``;
      return;
    } 
    if (event.exEventId == '3544687543453') {
      // if (!token) {
      //   let url = '/login';
      //   this.router.navigateByUrl(url);
      //   return
      // }
      let url = '/ballByBall/' + event?.sportId + '/' + event?.exEventId;
      this.router.navigateByUrl(url);
    }
    else {
      let url = "/fullMarket/" + event?.sportId + "/" + event?.exEventId;
      this.router.navigateByUrl(url);
    }
  }
  ErrorNotification_Manager(responseData: any) {
    if (responseData?.meta) {
      let errorObject = responseData.meta.message;
      if (typeof errorObject === "object") {
        for (var key of Object.keys(errorObject)) {
          if (errorObject[key].message != "") {
            // this.toaster.error(errorObject[key].message, "");
          }
          return;
        }
      } else {
        if (errorObject != "") {
          // this.toaster.error(errorObject, "", {});
        }
        return;
      }
    } else {
      // this.toaster.error("Hey, looks like something went wrong.", "", {});
      return;
    }
  }
  getAllSports(): Observable<any> {
    return this.http.post(CONFIG.SportsList, { key: CONFIG.siteKey });
  }
  getIpLocation(): Observable<any> {
    return this.http.post(CONFIG.getIpLocation, {});
  }
  getStreamData(params: any): Observable<any> {
    return new Observable<any>((observer) => {
      if (params.eventId == this.streamData?.data?.eventId) {
        observer.next(this.streamData);
        observer.complete();
      } else {
        // this.getAllRecordsByPost(CONFIG.videoStreamURL, params).subscribe((res: any) => {
        //   this.streamData = res;
        //   observer.next(res);
        //   observer.complete();
        // })

        this.getAllRecordsByPost(CONFIG.videoStreamURL, params)
          .then((res: any) => {
            this.streamData = res;
            observer.next(res);
            observer.complete();
          })
          .catch((error) => {
            // Handle error as needed
            console.error("Error:", error);
            observer.error(error); // If you want to propagate the error to the observer
            observer.complete();
          });
      }
      // this.http.post(CONFIG.videoStreamURL, params)
    });
  }
  getUserBalanceFromApi(): Observable<any> {
    return new Observable<any>((observer) => {
      this.getAllRecordsByPost(CONFIG.userBalance, {})
        .then((res: any) => {
          this.userBalance.next(res);
          observer.next(res);
          observer.complete();
        })
        .catch((error) => {
          // Handle error as needed
          console.error("Error:", error);
          observer.error(error); // If you want to propagate the error to the observer
          observer.complete();
        });
    });
  }
  getUserBalance(): Observable<any> {
    return this.userBalance.asObservable();
  }
  SetFancyChanged(change: any) {
    this.fancyChange.next(change);
  }
  getFancyChanged(): Observable<any> {
    return this.fancyChange.asObservable();
  }
  SetsportsbookDeletedData(deletedMarket: any) {
    this.deletedMarket.next(deletedMarket);
  }
  getsportsbookDeletedData(): Observable<any> {
    return this.deletedMarket.asObservable();
  }
  getCurrentUserName() {
    if (this.loggedUserData) {
      return this.loggedUserData.userName;
    } else {
      let userData = JSON.parse(localStorage.getItem("userDetail") as string);
      return userData?.userName ? userData?.userName : "";
    }
  }

  public getResultstream(): Observable<any> {
    return this.resultData.asObservable();
  }
  checkDomain() {
    // Define the list of provided domains
    const domains = ['https://t20worldexch.com'];
    // Get the origin of the current window location
    const currentOrigin = window.location.origin;

    if (domains.includes(currentOrigin)) {
      return true;
    } else {
      return false;
    }
  }
  public updateResultstream(message: any): void {
    this.resultData.next(message);
  }

  isMultiMarket(eventid: any) {
    const multimarket = localStorage.getItem(
      "multiMarket_" + this.getCurrentUserName()
    );

    if (multimarket) {
      const filterData: any[] = JSON.parse(multimarket);
      // console.log(filterData, '======================..........');
      if (filterData.some((entry) => entry.eventid === eventid)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  addToMultimarket(eventid: any, sportId: any) {
    const selectorClass = "." + eventid;
    $(selectorClass).toggleClass("pin-on");
    $(".btn-pin." + eventid).removeClass("pin-on");
    const currentUserName = this.getCurrentUserName();
    const multiMarketKey = "multiMarket_" + currentUserName;

    let multimarket = localStorage.getItem(multiMarketKey);
    let multiMarketData: any[] = [];

    if (multimarket) {
      multiMarketData = JSON.parse(multimarket);
    }
    const existingEntryIndex = multiMarketData.findIndex(
      (entry) => entry.sportId === sportId && entry.eventid === eventid
    );

    if (existingEntryIndex !== -1) {
      multiMarketData.splice(existingEntryIndex, 1);
      localStorage.setItem(multiMarketKey, JSON.stringify(multiMarketData));
    } else {
      multiMarketData.push({ sportId: sportId, eventid: eventid });
    }
    localStorage.setItem(multiMarketKey, JSON.stringify(multiMarketData));
  }
  public getRoundData(): Observable<any> {
    return this.roundData.asObservable();
  }

  public setRoundData(message: any): void {
    this.roundData.next(message);
  }
  setBetPlace(betObj: any) {
    this.betPlaceObj.next(betObj);
  }
  getBetPlace() {
    return this.betPlaceObj;
  }
  setBetslipOpened(tab: any) {
    this.betslipOpened.next(tab);
  }

  getBetslipOpened(): Observable<any> {
    return this.betslipOpened.asObservable();
  }
  private setLocalStorage(key: any, data: any): void {
    if (key == "getThemeConfig") {
      let obj = {
        data: data?.data,
      };
      localStorage.setItem(key, JSON.stringify(obj)); // Store data as a JSON string
    } else {
      localStorage.setItem(key, JSON.stringify(data)); // Store data as a JSON string
    }

    localStorage.setItem(key + "Time", new Date().toString());
  }

  getLocalStorage(key: any): Observable<any> {
    const record = localStorage.getItem(key);

    if (record) {
      if (key.includes("Time")) {
        return of(record);
      } else {
        const parsedRecord = JSON.parse(record);
        return of(parsedRecord); // Return parsed record using RxJS's 'of' operator
      }
    } else {
      return of(null); // Return an observable with null if record doesn't exist
    }
  }
  recordsFromLocalStorage(
    key: string,
    time: number,
    payload?: any
  ): Observable<any> {
    return new Observable<any>((observer) => {
      const path = key.split("/").filter(Boolean).pop();

      this.getLocalStorage(path + "Time").subscribe((res: any) => {
        if (res) {
          const date1 = new Date(res);
          const date2 = new Date();
          const diffInMilliseconds = date2.getTime() - date1.getTime();
          const minutes = Math.floor(diffInMilliseconds / (1000 * 60));

          if (minutes <= time) {
            this.getLocalStorage(path).subscribe((data: any) => {
              observer.next(data); // Emit the stored data if within the specified time
              observer.complete();
            });
          } else {
            this.getRecordsFromNetwork(key, payload).subscribe(
              (res) => {
                observer.next(res);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
          }
        } else {
          this.getRecordsFromNetwork(key, payload).subscribe(
            (res) => {
              observer.next(res);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        }
      });
    });
  }

  private getRecordsFromNetwork(key: any, payload?: any): Observable<any> {
    return new Observable<any>((observer) => {
      const path = key.split("/").filter(Boolean).pop();
      this.getAllRecordsByPost(key, payload)
        .then((record: any) => {
          this.setLocalStorage(path, record);
          observer.next(record);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  dateManager(newValue: string) {
    const today = new Date();
    let targetDate: Date;

    if (newValue === 'BACKUP') {
      // 3 months ago
      targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() - 3);
    } else if (newValue === 'LIVE') {
      targetDate = today;
    } else {
      // 1 year ago
      targetDate = new Date();
      targetDate.setFullYear(targetDate.getFullYear() - 1);
    }

    return {
      date: {
        year: targetDate.getFullYear(),
        month: targetDate.getMonth() + 1, // JS months are 0-based
        day: targetDate.getDate(),
      },
    };
  }

  getStartDate(date: any) {
    if (!date) {
      date = { year: new Date().getFullYear(), month: 1, day: 1 };
    }

    const startDate = new Date(date.date.year, date.date.month - 1, date.date.day);
    // Format as ISO string with timezone offset
    // Using Angular DatePipe here:
    const formattedStartDate = this.datePipe.transform(
      startDate,
      "yyyy-MM-dd'T'HH:mm:ssxxx"
    );
    return formattedStartDate;
  }

  getEndDate(date: any) {
    if (!date) {
      date = { year: new Date().getFullYear(), month: 1, day: 1 };
    }

    const endDate = new Date(date.date.year, date.date.month - 1, date.date.day);
    endDate.setHours(23, 59, 0, 0);

    const formattedEndDate = this.datePipe.transform(
      endDate,
      "yyyy-MM-dd'T'HH:mm:ssxxx"
    );
    return formattedEndDate;
  }
}
