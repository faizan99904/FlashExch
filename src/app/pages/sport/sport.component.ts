import { Component, effect } from '@angular/core';
import { MainService } from '../../service/main.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sport',
  imports: [CommonModule],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.css'
})
export class SportComponent {
  sidebarEvent: any;
  subSportList: any = [];
  sportIndex: any
  isSportList: boolean = true

  constructor(private mainService: MainService, private router:Router) {
    effect(() => {
      this.sidebarEvent = mainService.getSideBarEvent();
    })
  }

  filterSubSport(sportId: any) {
    this.isSportList = false;
    this.subSportList = [...this.sidebarEvent?.data].filter((event: any) => {
      return sportId === event.sportId
    })
  }

  openListChild(index: any) {
    if (this.sportIndex == index) {
      this.sportIndex = null
    } else {
      this.sportIndex = index
    }

  }

  gotoMarket(market: any) {
    localStorage.setItem('competitionName', market.tournamentName);
    this.router.navigateByUrl(
      '/market-detail/' + market.sportId + '/' + market.exEventId
    );
  }

}
