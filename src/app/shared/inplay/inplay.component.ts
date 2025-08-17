import { Component, effect } from '@angular/core';
import { MainService } from '../../service/main.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NetworkService } from '../../service/network.service';

@Component({
  selector: 'app-inplay',
  imports: [CommonModule],
  templateUrl: './inplay.component.html',
  styleUrl: './inplay.component.css',
})
export class InplayComponent {
  inplayList: any;
  constructor(private mainService: MainService, private networkService: NetworkService) {
    effect(() => {
      this.inplayList = this.mainService.getInplayEvents();
    });
  }

  gotoMarket(market: any) {
    const sportId = market.sportId;
    const exEventId = market.exEventId;
   this.networkService.gotoMarket(market);
  }
}
