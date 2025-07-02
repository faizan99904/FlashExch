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
    },
    {
      name: 'Basketball',
      icon: 'fa-solid fa-basketball',
      score: '96',
    },
    {
      name: '3x3 Basketball',
      icon: 'fa-solid fa-volleyball',
      score: '5',
    },

    {
      name: 'baseball',
      icon: 'baseball',
      score: '1061',
    },
    {
      name: 'ice hockey',
      icon: 'icehockey',
      score: '10',
    },
  ];
}
