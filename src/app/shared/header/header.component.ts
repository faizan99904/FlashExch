import { Component, computed, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../../service/network.service';
import { CONFIG } from '../../../../config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  token: any;
  userExposureList: any = [];
  userBalance: any
  exposureModal: boolean = false;
  constructor(
    private router: Router,
    public toggle: SharedService,
    public networkService: NetworkService,
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.toggle.getToken().subscribe((value: any) => {
      if (value) {
        this.token = value;
        this.networkService.getUserBalanceFromApi();
        this.gerUserEventExposure();
      }
    });
    if (this.token) {
      this.networkService.getUserBalanceFromApi();
      this.gerUserEventExposure();
    }

    effect(() => {
      this.userBalance = this.networkService.getUserBalanceSignal()();
    })
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


  gerUserEventExposure() {
    this.http.post(CONFIG.userEventExposure, {}).subscribe(({
      next: (res: any) => {
        this.userExposureList = res.data
      },
      error: (error) => {
        console.log(error);
      }
    }))
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
