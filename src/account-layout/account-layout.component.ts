import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SportsNavComponent } from '../shared/sports-nav/sports-nav.component';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AccountNavComponent } from '../pages/account-nav/account-nav.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-account-layout',
  imports: [
    HeaderComponent,
    SportsNavComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AccountNavComponent,
    NgIf,
  ],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.css',
})
export class AccountLayoutComponent {
  accountNav: string = '/account/nav';
  constructor(private router: Router) {}

  hide(): boolean {
    return this.accountNav.includes(this.router.url);
  }
}
