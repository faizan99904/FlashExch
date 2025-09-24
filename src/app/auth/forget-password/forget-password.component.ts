import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Component, ElementRef, QueryList, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../config';
import { MainService } from '../../service/main.service';
import { NetworkService } from '../../service/network.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  passForm!: FormGroup;
  otpForm!: FormGroup;
  otpSent: boolean = false;
  loader: boolean = false
  submitLoader: boolean = false;
  @ViewChild('otpInput') otpInputs!: QueryList<ElementRef>;
  @ViewChild('otpInput0') otpInput0!: ElementRef;
  @ViewChild('otpInput1') otpInput1!: ElementRef;
  @ViewChild('otpInput2') otpInput2!: ElementRef;
  @ViewChild('otpInput3') otpInput3!: ElementRef;
  @ViewChild('otpInput4') otpInput4!: ElementRef;
  @ViewChild('otpInput5') otpInput5!: ElementRef;
  passwordChecks = {
    lengthValid: false,
    noSequence: false,
    notSameAsUsername: false,
    hasUpperLowerNumber: false,
    hasSpecialChar: false,
  };
  constructor(
    private toaster: ToastrService,
    private http: HttpClient,
    private fb: FormBuilder,
    private backendService: MainService,
    private appService: NetworkService,
  ) {
    this.passForm = this.fb.group({
      userName: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      areaCode: ['91', [Validators.required]],
    });

    this.otpForm = this.fb.group({
      digit0: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      password: [
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,15}$'
            ),
          ]),
        ],
      ],
    });

    this.otpForm
      .get('password')
      ?.valueChanges.subscribe(() => this.onPasswordInput());
    this.passForm
      .get('userName')
      ?.valueChanges.subscribe(() => this.onPasswordInput());
  }

  generateOtp() {
    const formValue = this.passForm.value;
    const fullNum = `+${formValue.areaCode}${formValue.mobileNo}`;

    const payload = {
      userName: formValue.userName,
      mobileNo: fullNum,
    };

    if (this.passForm.valid && !this.loader) {
      this.loader = true
      this.http.post(CONFIG.sendForgotPasswordOtp, payload).subscribe({
        next: (res) => {
          this.toaster.success('OTP sent successfully!');
          this.otpSent = true;
          this.loader = false

          setTimeout(() => {
            if (this.otpInput0) {
              this.otpInput0.nativeElement.focus();
            }
          });
        },
        error: (err) => {
          this.appService.ErrorNotification_Manager(err.error);
          this.loader = false
        },
      });
    }
  }

  getClass(isValid: boolean): string {
    const password = this.otpForm.get('password')?.value;
    if (!password) return 'text-white';
    return isValid ? 'text-green-500' : 'text-red-500';
  }

  onPasswordInput() {
    const password = this.otpForm.get('password')?.value || '';
    const username = this.passForm.get('userName')?.value || '';

    this.passwordChecks.lengthValid = /^[^\s]{8,15}$/.test(password);
    this.passwordChecks.noSequence = !/123456/.test(password);
    this.passwordChecks.notSameAsUsername =
      password.toLowerCase() !== username?.toLowerCase();
    this.passwordChecks.hasUpperLowerNumber =
      /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    this.passwordChecks.hasSpecialChar = /[\W_]/.test(password);
  }

  handleKeyUp(event: any, index: number) {
    const value = event.target.value;
    if (value.length === 1) {
      if (index < 5) {
        this.focusInput(index + 1);
      }
    }
  }

  handleKeyDown(event: any, index: number) {
    if (event.key === 'Backspace' && !event.target.value && index > 0) {
      this.focusInput(index - 1);
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedText = clipboardData.getData('text');
    const otp = pastedText.replace(/\D/g, '').substring(0, 6);
    for (let i = 0; i < otp.length; i++) {
      this.otpForm.get(`digit${i}`)?.setValue(otp[i]);
    }
    this.focusInput(Math.min(5, otp.length - 1));
  }

  private focusInput(index: number) {
    switch (index) {
      case 0:
        this.otpInput0.nativeElement.focus();
        break;
      case 1:
        this.otpInput1.nativeElement.focus();
        break;
      case 2:
        this.otpInput2.nativeElement.focus();
        break;
      case 3:
        this.otpInput3.nativeElement.focus();
        break;
      case 4:
        this.otpInput4.nativeElement.focus();
        break;
      case 5:
        this.otpInput5.nativeElement.focus();
        break;
    }
  }

  onSubmit() {
    const isOtpValid = this.otpForm.valid;
    const isPassFormValid = this.passForm.valid;
    const passwordControl = this.otpForm.get('password');
    const isPasswordValid = passwordControl?.valid;


    if (isPassFormValid && isOtpValid && isPasswordValid && !this.submitLoader) {
      this.submitLoader = true
      const formValue = this.passForm.value;
      const otpValue = this.otpForm.value;
      const fullNumber = `+${formValue.areaCode}${formValue.mobileNo}`;
      const otpCode = Object.values(otpValue).slice(0, 6).join('');
      const password = otpValue.password;
      const payload = {
        userName: formValue.userName,
        password: password,
        mobileNo: fullNumber,
        code: otpCode,
      };

      // console.log(payload);

      this.http.post(CONFIG.verifyForgotPassword, payload).subscribe({
        next: (res) => {
          this.toaster.success('Registered Successfully!');
          this.submitLoader = false
        },
        error: (err) => {
          this.appService.ErrorNotification_Manager(err.err);
          this.submitLoader = false
        },
      });
    } else {
      this.toaster.warning(
        'Please enter the 6-digit OTP, password, and complete all fields'
      );

      this.otpForm.markAllAsTouched();
      this.passForm.markAllAsTouched();
    }
  }
}
