import { Component, computed, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-layout',
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    BottomNavComponent,
    BetslipComponent,
    SportsNavComponent,
    MobileSidebarComponent,
    SignupComponent,
    ForgetModalComponent,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  activeRoute: any;
  constructor(private toggle: SharedService, private router: Router) {}

  ngOnInit(): void {
    const routeUrl = this.router.url.split('/');
    const routeNameOne = routeUrl[1] || '/';
    this.activeRoute = routeNameOne;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.urlAfterRedirects.split('/');
        const routeName = urlSegments[1] || '/';
        this.activeRoute = routeName;
        console.log('Updated route:', this.activeRoute);
        setTimeout(() => {
          this.activeRoute = routeName;
        }, 0);
      }
    });
  }

  signUp = computed(() => this.toggle.isSignupVisible());
  forgetPass = computed(() => this.toggle.isPassVisible());
}
