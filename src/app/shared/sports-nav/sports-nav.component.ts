import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sports-nav',
  imports: [CommonModule, RouterLink],
  templateUrl: './sports-nav.component.html',
  styleUrl: './sports-nav.component.css',
})
export class SportsNavComponent {
  activeIndex: number | null = null;
  sports = [
    {
      name: 'Soccer',
      score: '972',
      sport: 'soccer',
    },
    {
      name: 'Basketball',
      score: '99',
      sport: 'basketball',
    },
    {
      name: '3x3 Basketball',
      score: '5',
      sport: 'basketball3x3',
    },

    {
      name: 'Tennis',
      score: '417',
      sport: 'tennis',
    },

    {
      name: 'Baseball',
      score: '114',
      sport: 'baseball',
    },

    {
      name: 'Ice Hockey',
      score: '24',
      sport: 'icehockey',
    },
    {
      name: 'Handball',
      score: '2',
      sport: 'handball',
    },
    {
      name: 'Formula 1',
      score: '61',
      sport: 'formula1',
    },
    {
      name: 'Formula E',
      score: '2',
      sport: 'formulae',
    },
  ];
}
