import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportslistComponent } from "../sportslist/sportslist.component";
import { MarketComponent } from "../../component/market/market.component";
import { MainService } from '../../service/main.service';
import { RacingComponent } from '../../pages/racing/racing.component';
import { LotteryComponent } from '../lottery/lottery.component';

@Component({
  selector: 'app-sport-events',
  imports: [CommonModule, RouterLink, SportslistComponent, MarketComponent, RacingComponent, LotteryComponent],
  templateUrl: './sport-events.component.html',
  styleUrl: './sport-events.component.css'
})
export class SportEventsComponent {

  activeSportId: any;

  isOddType: boolean = false
  searchTab: string = 'line_style'
  markets: any;
  constructor(public mainService: MainService) {
    effect(() => {
      const id = this.mainService.getActiveSport();
      this.changeSport(id);
    });
  }

  searchEvent(tab: any) {
    this.searchTab = tab
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
