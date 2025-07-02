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