import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { SportsNavComponent } from "../../shared/sports-nav/sports-nav.component";
import { BottomNavComponent } from "../../shared/bottom-nav/bottom-nav.component";
import { MobileSidebarComponent } from "../../shared/mobile-sidebar/mobile-sidebar.component";
import { BetslipComponent } from "../../shared/betslip/betslip.component";
import { RouterOutlet } from '@angular/router';
import { LivePageNavbarComponent } from "../../component/live-page-navbar/live-page-navbar.component";

@Component({
  selector: 'app-live-page',
  imports: [HeaderComponent, SportsNavComponent, BottomNavComponent, MobileSidebarComponent, RouterOutlet, BetslipComponent, LivePageNavbarComponent],
  templateUrl: './live-page.component.html',
  styleUrl: './live-page.component.css'
})
export class LivePageComponent {

}
