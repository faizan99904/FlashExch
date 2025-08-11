import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../service/main.service';
import { SharedService } from '../../service/shared.service';
import { MarketComponent } from '../market/market.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-my-favourites',
  imports: [CommonModule, MarketComponent],
  templateUrl: './my-favourites.component.html',
  styleUrl: './my-favourites.component.css',
})
export class MyFavouritesComponent implements OnInit {
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
  filterArray: any = [];
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private mainService: MainService,
    private shared: SharedService
  ) {
    // getAllEventsList$ = this.mainService.getAllEventlist()

    this.userDetail = JSON.parse(localStorage.getItem('userDetail') as string);
    this.selectedFilterid = JSON.parse(
      localStorage.getItem(`multiMarket_${this.shared.username()}`) ?? '[]'
    );
    const filterData: any[] = this.selectedFilterid;
    this.ids = filterData;

    effect(() => {
      this.EventsList = this.mainService.getAllEvents();
      this.getAllEvents();
    });
  }

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.searchTab = 'line_style';
    }
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

  getAllEvents() {
    this.interval = true;
    this.filterArray = [];
    if (this.ids) {
      for (let sportid of this.ids) {
        this.filteredEvents = this.EventsList[sportid.sportId];
        this.filteredEvents.forEach((element: any) => {
          if (element.exEventId === sportid.eventid) {
            this.filterArray.push(element);
          }
        });
        setTimeout(() => {
          this.interval = false;
        }, 300);
        this.filteredEvents = this.filterArray;
      }
    }
  }

  trackByFn(index: any) {
    return index;
  }
}
