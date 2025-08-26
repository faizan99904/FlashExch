import { Component, computed, effect, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
import { BetslipComponent } from '../shared/betslip/betslip.component';
import { SportsNavComponent } from '../shared/sports-nav/sports-nav.component';
import { SportEventsComponent } from '../shared/sport-events/sport-events.component';
import { MobileSidebarComponent } from '../shared/mobile-sidebar/mobile-sidebar.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { SharedService } from '../service/shared.service';
import { ForgetModalComponent } from '../shared/forget-modal/forget-modal.component';
import { AccountNavComponent } from '../pages/account-nav/account-nav.component';
import { CommonModule } from '@angular/common';
import { MatchedBetsComponent } from '../pages/market-detail/matched-bets/matched-bets.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    BottomNavComponent,
    BetslipComponent,
    SportsNavComponent,
    SignupComponent,
    ForgetModalComponent,
    CommonModule,
    MatchedBetsComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  activeRoute: any;
  constructor(private toggle: SharedService, private router: Router, private device: DeviceDetectorService) {
    effect(() => {
      this.toggle.betslipToggle();
      this.scrollToTop();
    });
  }

  ngOnInit(): void {
    const routeUrl = this.router.url.split('/');
    const routeNameOne = routeUrl[1] || '/';
    this.activeRoute = routeNameOne;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.urlAfterRedirects.split('/');
        const routeName = urlSegments[1] || '/';
        this.activeRoute = routeName;
        const mainRouter = document.querySelector('.mainRouter') as HTMLElement;
        if (mainRouter) {
          mainRouter.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setTimeout(() => {
          this.activeRoute = routeName;
        }, 0);
      }
    });
  }

  scrollToTop() {
    const sidebar = document.getElementById('rightSidebar');
    if (sidebar && window.innerWidth >= 1024) {
      sidebar.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  signUp = computed(() => this.toggle.isSignupVisible());
  forgetPass = computed(() => this.toggle.isPassVisible());
}
