import { Component, effect } from '@angular/core';
import { MainService } from '../../service/main.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NetworkService } from '../../service/network.service';

@Component({
  selector: 'app-sport',
  imports: [CommonModule],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.css',
})
export class SportComponent {
  sidebarEvent: any;
  subSportList: any = [];
  sportIndex: any;
  isSportList: boolean = true;

  constructor(
    private mainService: MainService,
    private router: Router,
    private networkService: NetworkService
  ) {
    effect(() => {
      this.sidebarEvent = mainService.getSideBarEvent();
    });
  }

  filterSubSport(sportId: any) {
    this.isSportList = false;
    this.subSportList = [...this.sidebarEvent?.data].filter((event: any) => {
      return sportId === event.sportId;
    });
    console.log(this.subSportList)
  }

  openListChild(index: any) {
    if (this.sportIndex == index) {
      this.sportIndex = null;
    } else {
      this.sportIndex = index;
    }
  }

  gotoMarket(event: any) {
    this.networkService.gotoMarket(event);
  }
}
