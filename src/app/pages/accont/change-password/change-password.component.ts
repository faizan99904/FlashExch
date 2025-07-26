import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../../config';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePassword!: FormGroup;
  confirmPasswordMatch: boolean = false

  constructor(private location: Location, private fb: FormBuilder, private http: HttpClient, private toaster: ToastrService, private router: Router) {
    this.changePassword = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
    })
  }

  goBack(): void {
    this.location.back();
  }

  checkMatchPassword() {
    const confirm = this.changePassword.get('confirmPassword')?.value
    const newPass = this.changePassword.get('newPassword')?.value
    if (confirm != newPass) {
      this.confirmPasswordMatch = true
    } else {
      this.confirmPasswordMatch = false
    }
  }



  onSubmit() {

    const req = {
      oldPassword: this.changePassword.get('oldPassword')?.value,
      newPassword: this.changePassword.get('newPassword')?.value
    }

    if(this.changePassword.valid){
      this.http.post(CONFIG.userChangePassword, req).subscribe({
        next: (res: any) => {
          this.toaster.success(res.meta.message);
          localStorage.clear();
          this.router.navigate(['/']);
          this.changePassword.reset();
        },

        error: (error: any) => {
          let errorObject = error.meta ? error.meta.message : error.error?.meta?.message;
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
        }
      })
    }

  }




}
