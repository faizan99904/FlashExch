import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SportsNavComponent } from '../shared/sports-nav/sports-nav.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account-layout',
  imports: [HeaderComponent, SportsNavComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.css'
})
export class AccountLayoutComponent {

}
