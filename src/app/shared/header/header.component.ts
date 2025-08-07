import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../../service/network.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  token: any;
  constructor(private router: Router, private toggle: SharedService, public networkService: NetworkService) {
    this.token = localStorage.getItem('token');
    this.toggle.getToken().subscribe((value: any) => {
      if (value) {
        this.token = value;
        this.networkService.getUserBalanceFromApi();
      }
    });
    if (this.token) {
      this.networkService.getUserBalanceFromApi();
    }

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
