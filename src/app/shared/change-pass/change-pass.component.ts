import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CONFIG } from '../../../../config';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-pass',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css',
})
export class ChangePassComponent {
  changePassword!: FormGroup;
  confirmPasswordMatch: boolean = false;
  isOld: boolean = false;
  isNew: boolean = false;
  isConfirm: boolean = false;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.changePassword = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
    });
  }

  focused(field: string) {
    if (field === 'oldPassword') {
      this.isOld = true;
    } else if (field === 'newPassword') {
      this.isNew = true;
    } else {
      this.isConfirm = true;
    }
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

  blurred(field: string) {
    const control = this.changePassword.get(field);
    if (control && !control.value) {
      if (field === 'oldPassword') this.isOld = false;
      else if (field === 'newPassword') this.isNew = false;
      else if (field === 'confirmPassword') this.isConfirm = false;
    }
  }

  onSubmit() {
    const req = {
      oldPassword: this.changePassword.get('oldPassword')?.value,
      newPassword: this.changePassword.get('newPassword')?.value,
    };

    if (this.changePassword.valid) {
      this.http.post(CONFIG.userChangePassword, req).subscribe({
        next: (res: any) => {
          this.toaster.success(res.meta.message);
          localStorage.clear();
          this.router.navigate(['/']);
          this.changePassword.reset();
        },

        error: (error: any) => {
          let errorObject = error.meta
            ? error.meta.message
            : error.error?.meta?.message;
          if (typeof errorObject === 'object') {
            for (var key of Object.keys(errorObject)) {
              this.toaster.error(errorObject[key].message, '', {
                positionClass: 'toast-top-right',
              });
              return;
            }
          } else {
            this.toaster.error(errorObject, '', {
              positionClass: 'toast-top-right',
              timeOut: 800,
            });
            return;
          }
        },
      });
    }
  }
}
