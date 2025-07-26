import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../../config';
@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changePassword!: FormGroup

  constructor(private location: Location, private fb: FormBuilder, private http: HttpClient) {
    this.changePassword = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
    })
  }

  goBack(): void {
    this.location.back();
  }

  passwordMatchValidator(group: FormGroup) {
    const newPass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return newPass === confirmPass ? null : { passwordMismatch: true };
  }

  onSubmit() {
    // CONFIG.userChangePassword
    const req = {
      oldPassword: this.changePassword.get('oldPassword')?.value,
      newPassword: this.changePassword.get('newPassword')?.value
    }
    this.http.post(CONFIG.userChangePassword, req).subscribe({
      next: (res: any) => {

      },

      error: (error: any) => {

      }
    })
  }




}
