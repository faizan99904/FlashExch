import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sports-nav',
  imports: [CommonModule],
  templateUrl: './sports-nav.component.html',
  styleUrl: './sports-nav.component.css',
})
export class SportsNavComponent {
  sports = [
    {
      name: 'Soccer',
      icon: 'fa-solid fa-volleyball',
      score: '972',
      sport: 'soccer',
    },
    {
      name: 'Basketball',
      icon: 'fa-solid fa-basketball',
      score: '96',
      sport: 'basketball',
    },
    {
      name: '3x3 Basketball',
      icon: 'fa-solid fa-volleyball',
      score: '5',
      sport: 'basketball3x3',
    },

    {
      name: 'Tennis',
      icon: 'tennis',
      score: '1061',
      sport: 'tennis',
    },
    {
      name: 'Ice Hockey',
      icon: 'icehockey',
      score: '10',
      sport: 'icehockey',
    },
  ];
}
