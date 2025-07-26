import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  token: any;
  constructor(private router: Router, private toggle: SharedService) {
    this.toggle.getToken().subscribe((value: any) => {
      if (value) {
        this.token = value;
      }
    });
    this.token = localStorage.getItem('token');
  }

  gotoLogin() {
    let width = window.innerWidth;
    this.onSubmit();
    if (width < 819) {
      this.router.navigateByUrl('/login');
    } else {
      return;
    }
  }

  gotoAccNav() {
    this.router.navigateByUrl('/account/nav');
  }

  showSignup() {
    this.toggle.toggleSignup();
  }

  showPass() {
    this.toggle.togglePass();
  }

  onSubmit() {
    localStorage.setItem(
      'token',
      'resolveallconflictsmanuallymarkthemasresolvedwith'
    );
    this.toggle.setToken('resolveallconflictsmanuallymarkthemasresolvedwith');
  }
}
