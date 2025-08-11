import { Component, computed, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../../service/network.service';
import { CONFIG } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../../service/main.service';
import { ToastrService } from 'ngx-toastr';
import { LoginModalComponent } from '../../component/login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, LoginModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  token: any;
  userExposureList: any = [];
  userBalance: any;
  exposureModal: boolean = false;
  constructor(
    private router: Router,
    public toggle: SharedService,
    public networkService: NetworkService,
    private http: HttpClient,
    private mainService: MainService,
    private toaster: ToastrService
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
    });
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
    this.http.post(CONFIG.userEventExposure, {}).subscribe({
      next: (res: any) => {
        this.userExposureList = res.data;
        this.toggle.exposureData.set(this.userExposureList);
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  goToMarketByUrlExposure(sportId: string, exEventId: string, sportName: any) {
    if (sportId == '6') {
      return;
    }
    if (sportId == '66102') {
      this.redirectToCasino(exEventId);
    } else {
      this.router.navigate(['/market-detail/' + sportId + '/' + exEventId]);
      this.exposureModal = false;
    }
  }

  redirectToCasino(eventId: any) {
    let token = localStorage.getItem('token');
    this.mainService
      .getDataFromServices(CONFIG.casinoEvents, CONFIG.casinoEventsTime, {
        key: CONFIG.siteKey,
      })
      .subscribe((data: any) => {
        if (data?.data?.lobby) {
          var lobby = data?.data?.lobby.find(
            (event: any) => event.eventId === eventId
          );
          if (lobby.link) {
            let isTokenString = lobby.link.includes('{$token}');
            if (isTokenString) {
              let finalLinkWithToken = lobby.link.replace('{$token}', token);
              let finalUrl = finalLinkWithToken.replace(
                '{$eventId}',
                lobby?.eventId
              );
              // console.log('final output',finalUrl)
              window.location.href = finalUrl;
              ``;
              return;
            } else {
              this.toaster.error('Please contact your upline! ', '', {
                positionClass: 'toast-top-center',
              });
              return;
            }
          } else {
            this.toaster.error('Please contact your upline! ', '', {
              positionClass: 'toast-top-center',
            });
            // let url = 'https://realclub.games//#/authentication/' + token + '/' + lobby?.eventId + '/' + lobby?.room;
            // this.router.navigate(['/opencasino', url]);
            return;
          }
        }
      });
  }

  onSubmit() {
    localStorage.setItem(
      'token',
      'resolveallconflictsmanuallymarkthemasresolvedwith'
    );
    this.toggle.setToken('resolveallconflictsmanuallymarkthemasresolvedwith');
  }
}
