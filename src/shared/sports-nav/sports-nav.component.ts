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
      score: '1061',
    },
    {
      name: 'Basketball',
      icon: 'fa-solid fa-basketball',
      score: '1061',
    },
    {
      name: '3x3 Basketball',
      icon: 'fa-solid fa-volleyball',
      score: '1061',
    },
    {
      name: 'Tennis',
      icon: 'fa-solid fa-volleyball',
      score: '1061',
    },
    {
      name: 'Baseball',
      icon: 'fa-solid fa-volleyball',
      score: '1061',
    },
    {
      name: 'Ice Hockey',
      icon: 'fa-solid fa-volleyball',
      score: '10',
    },
  ];
}
