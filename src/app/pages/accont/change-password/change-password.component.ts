import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../../config';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NetworkService } from '../../../service/network.service';
@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  changePassword!: FormGroup;
  confirmPasswordMatch: boolean = false;
  showOldPassword = false;
  loader: boolean = false
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private toaster: ToastrService,
    private router: Router,
    private appService: NetworkService
  ) {
    this.changePassword = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
    });
  }

  goBack(): void {
    this.location.back();
  }

  checkMatchPassword() {
    const confirm = this.changePassword.get('confirmPassword')?.value;
    const newPass = this.changePassword.get('newPassword')?.value;
    if (confirm != newPass) {
      this.confirmPasswordMatch = true;
    } else {
      this.confirmPasswordMatch = false;
    }
  }

  togglePassword(field: string) {
    if (field === 'old') {
      this.showOldPassword = !this.showOldPassword;
    } else if (field === 'new') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirm') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    const req = {
      oldPassword: this.changePassword.get('oldPassword')?.value,
      newPassword: this.changePassword.get('newPassword')?.value,
    };

    if (this.changePassword.valid && !this.loader) {
      this.loader = true
      this.http.post(CONFIG.userChangePassword, req).subscribe({
        next: (res: any) => {
          this.toaster.success(res.meta.message);
          localStorage.clear();
          this.router.navigate(['/']);
          this.loader = false
          this.changePassword.reset();
        },
        error: (error: any) => {
          this.loader = false
          this.appService.ErrorNotification_Manager(error.error);
        },
      });
    }
  }
}
