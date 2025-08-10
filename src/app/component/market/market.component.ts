import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../service/main.service';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-market',
  imports: [CommonModule],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css',
})
export class MarketComponent implements OnInit {
  @Input() isMobile: boolean = false;
  @Input() market: any = [];
  @Input() index: any;
  @Input() searchTab!: string;
  favourites: any

  constructor(private router: Router, private mainService: MainService, private shared: SharedService) {
    this.favourites = JSON.parse(
      localStorage.getItem(`multiMarket_${this.shared.username()}`) ?? '[]'
    );


  }

  ngOnInit(): void { }
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

  addToMultimarket(market: any) {
    let token = localStorage.getItem('token');
    if (token) {
      this.mainService.addToMultimarket(market.exEventId, market.sportId);
      console.log(market);
      this.favourites = JSON.parse(
        localStorage.getItem(`multiMarket_${this.shared.username()}`) ?? '[]'
      );
    } else {
      let width = window.innerWidth;
      if (width >= 1024) {
        this.shared.setLoginModal(true);
      } else {
        let url = '/login';
        this.router.navigateByUrl(url);
      }
    }
  }

  hasFavourite(marketId: string): boolean {
    return this.favourites?.some((e:any) => e.eventid?.includes(marketId)) ?? false;
  }
}
