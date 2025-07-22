import { Component, computed, signal, Signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { SportsNavComponent } from '../shared/sports-nav/sports-nav.component';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
import { MobileSidebarComponent } from '../shared/mobile-sidebar/mobile-sidebar.component';
import { BetslipComponent } from '../shared/betslip/betslip.component';
import { LivePageNavbarComponent } from '../component/live-page-navbar/live-page-navbar.component';
import { LiveSidebarComponent } from '../component/live-sidebar/live-sidebar.component';
import { CommonModule } from '@angular/common';
import { MatchTrackerComponent } from '../component/match-tracker/match-tracker.component';
import { SharedService } from '../service/shared.service';





@Component({
  selector: 'app-live-page',
  standalone:true,
  imports: [
    HeaderComponent,
    SportsNavComponent,
    BottomNavComponent,
    MobileSidebarComponent,
    RouterOutlet,
    BetslipComponent,
    LivePageNavbarComponent,
    LiveSidebarComponent,
    CommonModule,
    MatchTrackerComponent,
  ],
  templateUrl: './live-page.component.html',
  styleUrl: './live-page.component.css',
})
export class LivePageComponent {
  currentUrl = signal<string>('');

  showMatchTracker = computed(() => this.currentUrl().startsWith('/live'));
  constructor(public toggle: SharedService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.set(event.urlAfterRedirects);
      }
    });
  }
}
