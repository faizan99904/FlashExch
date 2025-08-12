import { Component, effect } from '@angular/core';
import { MainService } from '../../service/main.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inplay',
  imports: [CommonModule],
  templateUrl: './inplay.component.html',
  styleUrl: './inplay.component.css',
})
export class InplayComponent {
  inplayList: any;
  constructor(private mainService: MainService, private router: Router) {
    effect(() => {
      this.inplayList = this.mainService.getInplayEvents();
    });
  }

  gotoMarket(market: any) {
    const sportId = market.sportId;
    const exEventId = market.exEventId;
    this.router.navigateByUrl(`/market-detail/${sportId}/${exEventId}`);
  }
}
