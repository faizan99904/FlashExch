import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-market',
  imports: [RouterLink, CommonModule],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css'
})
export class MarketComponent {
  arr = [1,2,3,5,6,6,7,8,9,4,5,7]
}
