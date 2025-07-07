import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../app/service/shared.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private router: Router, private toggle: SharedService) {}

  gotoLogin() {
    let width = window.innerWidth;
    if (width < 819) {
      this.router.navigateByUrl('/login');
    } else {
      return;
    }
  }

  showSignup() {
    this.toggle.toggleSignup();
  }
}
