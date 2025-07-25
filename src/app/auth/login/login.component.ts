import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONFIG } from '../../../../config';
import { NetworkService } from '../../service/network.service';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, HeaderComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  currentIndex = 0;
  iplocation: any;
  loginForm!: FormGroup;

  images = [
    '/assets/images/slide1.webp',
    '/assets/images/slide2.webp',
    '/assets/images/slide3.webp',
  ];

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

  constructor(private router: Router, private toaster: ToastrService, private http: HttpClient, private fb: FormBuilder, private appService: NetworkService, private mainService: MainService) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })

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


  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    }
  }

  isFirst(): boolean {
    return this.currentIndex === 0;
  }

  isLast(): boolean {
    return this.currentIndex === this.images.length - 1;
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

}
