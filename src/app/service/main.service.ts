import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CONFIG } from '../../../config';
import { IndexedDbService } from './indexed-db.service';
import { NetworkService } from './network.service';


@Injectable({
  providedIn: 'root',
})
export class MainService {
  private allSportsStatic: any;

  // ─── Signals ───────────────────────────────────────────
  allSports: WritableSignal<any>               = signal(null);
  exchangeMode: WritableSignal<any>            = signal(null);
  loggedIn: WritableSignal<boolean>            = signal(false);
  eventId: WritableSignal<any>                 = signal(null);

  casinoEvents: WritableSignal<any|null>       = signal(null);
  sportsList: WritableSignal<any|null>         = signal(null);
  searchEventList: WritableSignal<any|null>    = signal(null);
  exchangeTypeList: WritableSignal<any|null>   = signal(null);
  customerSupport: WritableSignal<any|null>    = signal(null);

  allEventList: WritableSignal<any|null>       = signal(null);
  allRacingEventList: WritableSignal<any|null> = signal(null);

  miniCasinoOpened: WritableSignal<boolean>    = signal(false);
  autoDepositURL: WritableSignal<string|null>  = signal(null);
  showChangePasswordModal: WritableSignal<boolean> = signal(false);

  logout: WritableSignal<any>                  = signal(null);

  activeSport: WritableSignal<string|null>  = signal(null);

  constructor(
    private networkService: NetworkService,
    private indexedDBService: IndexedDbService
  ) {}

  // ─── Show Change-Password Modal ────────────────────────
  setShowChangePasswordModal(value: boolean): void {
    this.showChangePasswordModal.set(value);
  }
  getShowChangePasswordModal(): boolean {
    return this.showChangePasswordModal();
  }

  // ─── Login / Logout ────────────────────────────────────
  setLoggedIn(state: boolean): void {
    this.loggedIn.set(state);
  }
  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  setLogout(payload: any): void {
    this.logout.set(payload);
  }
  getLogout(): any {
    return this.logout();
  }

  // ─── Event ID ──────────────────────────────────────────
  setEventId(id: any): void {
    this.eventId.set(id);
  }
  getEventId(): any {
    return this.eventId();
  }

  // Active Sport 
  
  setActiveSport(sport:any){
    this.activeSport.set(sport);
  }
  getActiveSport(): any {
    return this.activeSport();
  }
  // ─── Casino Events ─────────────────────────────────────
  setCasinoEvents(list: any|null): void {
    this.casinoEvents.set(list);
  }
  getCasinoEvents(): any|null {
    return this.casinoEvents();
  }

  setSportsList(value: any[] | null): void {
    const path = CONFIG.getAllEventsList
      .split('/')
      .filter(Boolean)
      .pop()!;
  
    this.indexedDBService.getRecord(path).subscribe((res: any) => {
      const allData = res?.data ?? {};
  
      // default value → empty array
      const list = value ?? [];
  
      const filtered = list.filter((item: any) => {
        const entries = Array.isArray(allData[item.sportId])
          ? allData[item.sportId]
          : [];
        const hasEntries    = entries.length > 0;
        const isNotExcluded = item.sportId !== '66103';
        const isCasino      = item.sportId !== '66102';
        const isLottery     = item.sportId === '66104';
  
        // keep if (hasEntries & not excluded) OR casino OR lottery
        const keep = (hasEntries && isNotExcluded) || isCasino || isLottery;
        if (keep) {
          item.total = entries.length;
        }
        return keep;
      });
  
      this.sportsList.set(filtered);
    });
  }
  getSportsList(): any|null {
    return this.sportsList();
  }
  checkSports(): void {
    const path = CONFIG.SportsList.split('/').filter(Boolean).pop()!;
    this.indexedDBService.getRecord(path).subscribe((res: any) => {
      this.setSportsList(res.data);
    });
  }

  // ─── Search Event List ─────────────────────────────────
  setSearchEventList(value: any|null): void {
    this.searchEventList.set(value);
  }
  getSearchEventList(): any|null {
    return this.searchEventList();
  }

  // ─── Exchange Type List ────────────────────────────────
  setExchangeTypeList(value: any|null): void {
    this.exchangeTypeList.set(value);
  }
  getExchangeTypeList(): any|null {
    return this.exchangeTypeList();
  }

  // ─── Customer Support ──────────────────────────────────
  setCustomerSupport(value: any|null): void {
    this.customerSupport.set(value);
  }
  getCustomerSupport(): any|null {
    return this.customerSupport();
  }

  // ─── All Events Lists ──────────────────────────────────
  setAllEvents(value: any): void {
    this.allEventList.set(value);
  }
  getAllEvents(): any|null {
    return this.allEventList();
  }

  setAllRacingEvents(value: any): void {
    this.allRacingEventList.set(value);
  }
  getAllRacingEvents(): any|null {
    return this.allRacingEventList();
  }

  // ─── Mini Casino & Auto-Deposit ────────────────────────
  setMiniCasinoOpened(opened: boolean): void {
    this.miniCasinoOpened.set(opened);
  }
  isMiniCasinoOpened(): boolean {
    return this.miniCasinoOpened();
  }

  setAutoDepositURL(url: string|null): void {
    this.autoDepositURL.set(url);
  }
  getAutoDepositURL(): string|null {
    return this.autoDepositURL();
  }

  private createtimestamp(key: any): Observable<Boolean> {    
    return this.indexedDBService.createRecord(key, Date());
  }

  private getRecordsFromNetwork(key: any, payload?: any,path?:any): Observable<any> {
    return new Observable<any>((observer) => {
      
      this.networkService.getAllRecordsByPost(key, payload).then((record: any) => {
        if(record?.meta){
          delete record.meta;
        }
        this.indexedDBService.createRecord(path, record).subscribe(() => {
          this.createtimestamp(path + 'Time').subscribe(() => {
            observer.next(record);
            observer.complete();
          }, (error) => {
            observer.error(error);
          });
        }, (error) => {
          observer.error(error);
        });
      }).catch((error) => {
        observer.error(error);
      })
    });
  }

  private getRecordsFromDB(key: any, payload?: any,path?:any): Observable<any> {
    return new Observable<any>((observer) => {
      this.indexedDBService.getRecord(path).subscribe(
        (data: any) => {
          if (data) {
            observer.next(data);
            observer.complete();
          }
          else {
            this.getRecordsFromNetwork(key, payload,path).subscribe((data: any) => {
              observer.next(data);
              observer.complete();
            }, (error) => {
              observer.error(error);
            })
          }
        },
        (error: any) => {
          console.error('Error retrieving record: ', error);
          observer.error(error);
        }
      );
    });
  }
  getDataFromServices(key: any, timeLimit: any, payload?: any,
    IncomingPath?:any,): Observable<any> {
    const resultSubject = new Subject<any>();

    // const url = new URL(key);
    if (!payload) {
      payload = {};
    }

    let path:any;
    if(IncomingPath){
      path = IncomingPath
    }
    else{
      path = key.split('/').filter(Boolean).pop();
    }

    this.indexedDBService.getRecord(path + 'Time').subscribe(
      (data: any) => {
        if (data) {
          const date1 = new Date(data);
          const date2 = new Date();
          const diffInMilliseconds = date2.getTime() - date1.getTime();
          const minutes = Math.floor(diffInMilliseconds / (1000 * 60));

          if (minutes > timeLimit) {
            this.getRecordsFromDB(key, payload, path).subscribe(
              (dbData: any) => {
                if (path == 'allEventsList') {
                  this.setAllEvents(dbData.data)
                }
                if (path == 'racingEventsList') {
                  this.setAllRacingEvents(dbData)
                }
                // dbData.type = 'db';
                // console.log('db', dbData);
                resultSubject.next(dbData);
                resultSubject.complete();
                // debugger
                this.getRecordsFromNetwork(key, payload,path).subscribe(
                  (networkData: any) => {
                    if (path == 'allEventsList') {
                      this.setAllEvents(networkData.data);
                    }
                    if (path == 'racingEventsList') {
                      this.setAllRacingEvents(networkData);
                    }
                    resultSubject.next(networkData);
                    resultSubject.complete();
                  },
                  (networkError: any) => {
                    resultSubject.error(networkError);
                  }
                );
              },
              (dbError: any) => {
                resultSubject.error(dbError);
              }
            );
          } else {
            this.getRecordsFromDB(key, payload,path).subscribe(
              (data: any) => {
                resultSubject.next(data);
                resultSubject.complete();
              },
              (error) => {
                resultSubject.error(error);
              }
            );
          }
        } else {
          // debugger
          this.getRecordsFromNetwork(key, payload,path).subscribe(
            (data: any) => {
              resultSubject.next(data);
              resultSubject.complete();
            },
            (error) => {
              resultSubject.error(error);
            }
          );
        }
      }
    );

    return resultSubject.asObservable();
  }

}