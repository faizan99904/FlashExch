import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportslistComponent } from "../sportslist/sportslist.component";
import { MarketComponent } from "../../component/market/market.component";
import { MainService } from '../../service/main.service';
import { RacingComponent } from '../../pages/racing/racing.component';
import { LotteryComponent } from '../lottery/lottery.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-sport-events',
  imports: [CommonModule, RouterLink, SportslistComponent, MarketComponent, RacingComponent, LotteryComponent, SearchComponent],
  templateUrl: './sport-events.component.html',
  styleUrl: './sport-events.component.css'
})
export class SportEventsComponent {

  activeSportId: any;
  isSearchActive:boolean = false;
  filterEvent: any = [];
  searchFilterValue: any = []
  isOddType: boolean = false
  searchTab: string = 'line_style'
  markets: any;
  constructor(public mainService: MainService) {
    effect(() => {
      const id = this.mainService.getActiveSport();
      this.filterEvent = this.mainService.getAllEvents();
      console.log(this.filterEvent, 'filterEvent')
      this.changeSport(id);
    });
  }

  searchEvent(tab: any) {
    this.searchTab = tab
  }

  changeColor(){
    this.isSearchActive  = !this.isSearchActive
   }



  searchFilter(value: string) {
    if (!value) return;

    if (value.length >= 2) {
      this.searchFilterValue = [];
      Object.values(this.filterEvent)
        .flat()
        .forEach((event: any) => {
          if (event.eventName.toLowerCase().includes(value.toLowerCase())) {
            this.searchFilterValue.push(event);
            if (value.length >= 2 && event.sport === '7' || event.sport === '4339') {
              this.searchFilterValue = []
            }
          }
        });
    }

  }

  oddToggle() {
    this.isOddType = !this.isOddType
  }

  receiveMessage(event: any) {
    this.activeSportId = event;
  }

  changeSport(sportId: any) {
    this.activeSportId = sportId;
    let allevents = this.mainService.getAllEvents();
    if (allevents) {
      this.markets = allevents[sportId];
      // console.log('markets',this.markets)
    }
    this.mainService.setActiveSport(sportId);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
