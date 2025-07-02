import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  dropdowns: { [key: string]: boolean } = {
    topLeagues: false,
    topLive: false,
    topEsport: false
  };
  

  timeFilter = '6H';
  topLeagues = [
    { name: 'FIFA Club World Cup', count: 27, image: 'assets/icons/fifa.png' },
    { name: 'UEFA Europa Conference League', count: 6, image: 'assets/icons/uefa.png' },
    { name: 'Premier League', count: 10, image: 'assets/icons/premier.png' },
    { name: 'Bundesliga', count: 9, image: 'assets/icons/bundesliga.png' },
    { name: 'Serie A', count: 10, image: 'assets/icons/seriea.png' },
    { name: 'Ligue 1', count: 8, image: 'assets/icons/ligue1.png' },
    { name: 'MLS', count: 15, image: 'assets/icons/mls.png' },
    { name: 'British Grand Prix 2025', count: 35, image: 'assets/icons/f1.png' },
    { name: 'Serie A', count: 20, image: 'assets/icons/seriea.png' },
    { name: 'ATP - Wimbledon', count: 76, image: 'assets/icons/atp.png' },
    { name: 'WTA - Wimbledon', count: 82, image: 'assets/icons/wta.png' },
    { name: 'MLB', count: 18, image: 'assets/icons/mlb.png' },
    { name: 'NFL', count: 37, image: 'assets/icons/nfl.png' }
  ];
  
  sports = [
    { name: 'Soccer', count: 1024, selected: false },
    { name: 'Basketball', count: 47, selected: false },
    { name: '3x3 Basketball', count: 1, selected: false },
    { name: 'Tennis', count: 571, selected: false },
    { name: 'Baseball', count: 59, selected: false },
    { name: 'Ice Hockey', count: 22, selected: false },
    { name: 'Handball', count: 3, selected: false }
  ];

  toggleDropdown(name: string) {
    this.dropdowns[name] = !this.dropdowns[name];
  }

  setTimeFilter(filter: string) {
    this.timeFilter = filter;
  }

  resetSports() {
    this.sports.forEach(s => s.selected = false);
  }
}