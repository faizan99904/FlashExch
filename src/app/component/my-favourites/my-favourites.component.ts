import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../service/main.service';


@Component({
  selector: 'app-my-favourites',
  imports: [CommonModule],
  templateUrl: './my-favourites.component.html',
  styleUrl: './my-favourites.component.css'
})
export class MyFavouritesComponent {
  @Input() isMobile: boolean = false;
  @Input() market: any = [];
  @Input() index: any;
  @Input() searchTab!: string;

  eventId: any;
  filterEventResult: any;
  EventsList: any = [];
  selectedFilterid: any = [];
  filteredEvents: any = [];
  ids: any = [];
  filteredEvent: any;
  interval!: boolean;
  userDetail: any;


  constructor(private router: Router, private mainService: MainService) {
    // getAllEventsList$ = this.mainService.getAllEventlist()

    this.userDetail = JSON.parse(localStorage.getItem('userDetail') as string);
    this.selectedFilterid = localStorage.getItem('multiMarket_' + this.userDetail.userName);
    const filterData: any[] = JSON.parse(this.selectedFilterid);
    this.ids = filterData

  }

  ngOnInit(): void {
    
   }

  getEventName(first: boolean, eventName: any) {
    let splitArray = eventName.split(' v ');
    if (first) {
      return splitArray[0];
    } else {
      return splitArray[1];
    }
  }

  gotoMarket(market: any) {
    localStorage.setItem('competitionName', market.tournamentName);
    this.router.navigateByUrl(
      '/market-detail/' + market.sportId + '/' + market.exEventId
    );
  }

  // getAllEvents() {
  //   this.interval = true;
  //   this.getAllEventsList$.subscribe((data: any) => {
  //     let filterArray: any = [];
  //     this.EventsList = data;
  //     if (this.ids) {
  //       for (let sportid of this.ids) {
  //         this.filteredEvents = this.EventsList[sportid.sportId];
  //         this.filteredEvents.forEach((element: any) => {
  //           if (element.exEventId === sportid.eventid) {
  //             filterArray.push(element);
  //           }
  //         });
  //         setTimeout(() => {
  //           this.interval = false;
  //         }, 300);
  //         this.filteredEvents = filterArray;

  //       }
  //     }
  //   });
    
  // }



}
