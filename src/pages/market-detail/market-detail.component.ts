import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-market-detail',
  imports: [],
  templateUrl: './market-detail.component.html',
  styleUrl: './market-detail.component.css'
})
export class MarketDetailComponent {
  constructor(private location: Location){}
  navigateBack() {
    this.location.back();
  }
}
