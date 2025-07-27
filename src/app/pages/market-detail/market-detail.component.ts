import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { BetslipComponent } from '../../shared/betslip/betslip.component';

@Component({
  selector: 'app-market-detail',
  imports: [BetslipComponent, CommonModule],
  templateUrl: './market-detail.component.html',
  styleUrl: './market-detail.component.css',
})
export class MarketDetailComponent {
  selectedColor: string = '';
  fancyMarket: boolean = true;
  constructor(private location: Location) {}

  navigateBack() {
    this.location.back();
  }

  showBox(color: string) {
    this.selectedColor = color;
  }
}
