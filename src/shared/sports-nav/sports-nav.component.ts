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
      name: 'soccer',
      icon: 'soccer',
      score: '1061',
    },
    {
      name: 'basketball',
      icon: 'basketball',
      score: '10',
    },
    {
      name: '3x3 basketball',
      icon: 'basketball3x3',
      score: '103',
    },
    {
      name: 'tennis',
      icon: 'tennis',
      score: '1061',
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
