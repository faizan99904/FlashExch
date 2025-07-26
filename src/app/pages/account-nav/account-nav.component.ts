import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-nav',
  imports: [FooterComponent, RouterLink],
  templateUrl: './account-nav.component.html',
  styleUrl: './account-nav.component.css',
})
export class AccountNavComponent {}
