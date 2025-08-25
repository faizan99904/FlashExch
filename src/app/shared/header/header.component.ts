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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, LoginModalComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  loginForm!: FormGroup;
  iplocation: any;
  token: any;
  userExposureList: any = [];
  userBalance: any;
  exposureModal: boolean = false;
  staticIpRes =
    {
      as: '0',
      city: '0',
      country: '0',
      countryCode: '0',
      isp: '0',
      lat: '0',
      lon: '0',
      org: '0',
      query: '0',
      region: '0',
      regionName: '0',
      status: '0',
      timezone: '0',
      zip: '0',
    }


  constructor(
    private router: Router,
    private fb: FormBuilder,
    public toggle: SharedService,
    public networkService: NetworkService,
    private http: HttpClient,
    private mainService: MainService,
    private toaster: ToastrService,
    private deviceService: DeviceDetectorService,
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

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.iplocation = this.staticIpRes;
    if (this.deviceService.isDesktop()) {
      this.networkService.getIpLocation().subscribe(
        (locRes: any) => {
          this.iplocation = locRes;
        },
        (error) => {
          this.iplocation = this.staticIpRes;
        }
      );
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
    const req = {
      ipInfo: this.iplocation,
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value,
    }

    if (this.loginForm.valid) {
      this.http.post(CONFIG.userLogin, req).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('userDetail', JSON.stringify(res.data.userDetail));
          localStorage.setItem('intCasino', res.data.intCasino)
          this.router.navigate(['/']);
          if (res.data.userDetail.isLogin == 0) {
            this.router.navigate(['/account/change-password']);
          } else {
            this.router.navigate(['/']);
          }

          this.toaster.success(res.meta.message, '', {
            positionClass: 'toast-top-right',
          });

        },
        error: (error: any) => {
          this.toaster.error(error.meta.message, '', {
            positionClass: 'toast-top-right',
          });
        }
      })
    }
  }

  // userLogout
  logout() {
    this.http.post(CONFIG.userLogout, {}).subscribe({
      next: (res: any) => {
        this.toaster.success(res.meta.message);
        localStorage.clear();
        this.toggle.setToken(null);
        this.token = null
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        this.toaster.success(err.error.message)
      }
    })
  }


}
