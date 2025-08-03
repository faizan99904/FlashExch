import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() isMobile: boolean = false;
  @Input() market: any = [];
  @Input() index: any;
  @Input() searchTab!: string;

  constructor(private router:Router){}

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
}
