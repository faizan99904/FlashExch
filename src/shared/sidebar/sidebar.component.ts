import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  dropdowns: { [key: string]: boolean } = {
    topLeagues: false,
    topLive: false,
    topEsport: false
  };
  showSidebarContent = true; // This will control visibility

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateSidebarVisibility(event.urlAfterRedirects);
    });
  }

  updateSidebarVisibility(currentUrl: string) {
    // Example: Hide sidebar content on '/login' and '/register' routes
    const hiddenRoutes = ['/racing'];
    this.showSidebarContent = !hiddenRoutes.includes(currentUrl);
  }

  timeFilter = 'All';
  topLiveGames = {
    soccer: [
      { team1: 'Brentford (SRL)', team2: 'Mainz (SRL)', odds: ['3.25', '2.50', '2.75'] },
      { team1: 'Rakow Czestochowa', team2: 'FK Austria Wien', odds: ['2.95', '2.40', '3.10'] },
      { team1: 'Paris Saint Germain', team2: 'FC Bayern Munich', odds: ['15.00', '3.65', '1.12'] }
    ],
    basketball: [
      { team1: 'Tigers', team2: 'Lions', odds: ['5.30', '1.10'] },
      { team1: 'Ningbo Waves', team2: 'Shenyang Seagulls', odds: ['1.75', '1.95'] },
      { team1: 'Los Angeles Lakers', team2: 'Oklahoma City Thunder', odds: ['1.73', '1.95'] }
    ]
  };




  toggleDropdown(name: string) {
    this.dropdowns[name] = !this.dropdowns[name];
  }

  setTimeFilter(filter: string) {
    this.timeFilter = filter;
  }


}