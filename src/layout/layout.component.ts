import { Component, computed } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
import { BetslipComponent } from '../shared/betslip/betslip.component';
import { SportsNavComponent } from '../shared/sports-nav/sports-nav.component';
import { SportEventsComponent } from '../shared/sport-events/sport-events.component';
import { MobileSidebarComponent } from '../shared/mobile-sidebar/mobile-sidebar.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { SharedService } from '../app/service/shared.service';
import { ForgetModalComponent } from '../shared/forget-modal/forget-modal.component';
import { AccountNavComponent } from "../pages/account-nav/account-nav.component";

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
    AccountNavComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private toggle: SharedService) {}
  signUp = computed(() => this.toggle.isSignupVisible());
  forgetPass = computed(() => this.toggle.isPassVisible());
}
