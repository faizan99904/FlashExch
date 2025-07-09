import { Component } from '@angular/core';

@Component({
  selector: 'app-racing',
  imports: [],
  templateUrl: './racing.component.html',
  styleUrl: './racing.component.css'
})
export class RacingComponent {
  isWithOdds = false;

  toggleOdds() {
    this.isWithOdds = !this.isWithOdds;
  }
}
