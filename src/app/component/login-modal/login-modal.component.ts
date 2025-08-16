import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NetworkService } from '../../service/network.service';
import { CONFIG } from '../../../../config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  loginForm!: FormGroup;
  isLoginModal: boolean = false
  iplocation: any;
  constructor(private fb: FormBuilder, private appService: NetworkService, private http: HttpClient, private toaster: ToastrService, private router: Router, private sharedService: SharedService,) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.isLoginModal) {
      this.iplocation = this.staticIpRes;
      this.appService.getIpLocation().subscribe(
        (locRes: any) => {
          this.iplocation = locRes;
        },
        (error) => {
          this.iplocation = this.staticIpRes;
        }
      );
    }

    effect(() => {
      this.isLoginModal = this.sharedService.getLoginModal()();
    })

  }

  closeLoginModal() {
    this.sharedService.setLoginModal(false);
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigateByUrl('/')
    }
  }

  outSideClose(){
    this.sharedService.setLoginModal(false);
  }

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

  showSignup() {
    this.sharedService.toggleSignup();
    this.isLoginModal = false
  }
}
