import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { BottomNavComponent } from '../shared/bottom-nav/bottom-nav.component';
import { BetslipComponent } from "../shared/betslip/betslip.component";
import { SportsNavComponent } from "../shared/sports-nav/sports-nav.component";

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, BottomNavComponent, BetslipComponent, SportsNavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
