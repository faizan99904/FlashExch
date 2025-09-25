import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bonuses',
  imports: [],
  templateUrl: './bonuses.component.html',
  styleUrl: './bonuses.component.css'
})
export class BonusesComponent {
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }
}
