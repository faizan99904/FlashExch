import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import { SharedService } from '../../service/shared.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  otpSent: boolean = false;
  havePromo: boolean = false;
  signupForm!: FormGroup;
  otpForm!: FormGroup;


  passwordChecks = {
    lengthValid: false,
    noSequence: false,
    notSameAsUsername: false,
    hasUpperLowerNumber: false,
    hasSpecialChar: false,
  };

  @ViewChild('otpInput') otpInputs!: QueryList<ElementRef>;
  @ViewChild('otpInput0') otpInput0!: ElementRef;
  @ViewChild('otpInput1') otpInput1!: ElementRef;
  @ViewChild('otpInput2') otpInput2!: ElementRef;
  @ViewChild('otpInput3') otpInput3!: ElementRef;
  @ViewChild('otpInput4') otpInput4!: ElementRef;
  @ViewChild('otpInput5') otpInput5!: ElementRef;
  constructor(
    private toggle: SharedService,
    private fb: FormBuilder,
    private http: HttpClient,
    private toaster: ToastrService
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,15}$'
          ),
        ]),
      ],
      areaCode: ['91', Validators.required],
      mobileNumber: ['', Validators.required],
      promoCode: [''],
    });

    this.otpForm = this.fb.group({
      digit0: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit5: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });

    this.signupForm
      .get('password')
      ?.valueChanges.subscribe(() => this.onPasswordInput());
    this.signupForm
      .get('username')
      ?.valueChanges.subscribe(() => this.onPasswordInput());
  }
  closeSignup() {
    this.toggle.hideSignup();
  }

  getClass(isValid: boolean): string {
    const password = this.signupForm.get('password')?.value;
    if (!password) return 'text-white';
    return isValid ? 'text-green-500' : 'text-red-500';
  }

  onPasswordInput() {
    const password = this.signupForm.get('password')?.value || '';
    const username = this.signupForm.get('username')?.value || '';

    this.passwordChecks.lengthValid = /^[^\s]{8,15}$/.test(password);
    this.passwordChecks.noSequence = !/123456/.test(password);
    this.passwordChecks.notSameAsUsername =
      password.toLowerCase() !== username?.toLowerCase();
    this.passwordChecks.hasUpperLowerNumber =
      /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
    this.passwordChecks.hasSpecialChar = /[\W_]/.test(password);
  }

  onSubmit() {
    if (this.signupForm.valid && this.otpForm.valid) {
      const formValue = this.signupForm.value;
      const fullNumber = `+${formValue.areaCode}${formValue.mobileNumber}`;
      const otpCode = Object.values(this.otpForm.value).join('');

      const payload = {
        userName: formValue.username,
        password: formValue.password,
        mobileNo: fullNumber,
        referralBy: formValue.promoCode || '',
        code: otpCode,
      };
      this.http.post(CONFIG.verifyUserRegisterOtp, payload).subscribe({
        next: (res) => {
          this.toaster.success('Registered Successfully!');
        },
      });
      // console.log(payload);
    } else {
      // console.log('Form is invalid');
    }
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

  generateOtp() {
    const formValue = this.signupForm.value;
    const fullNumber = `+${formValue.areaCode}${formValue.mobileNumber}`;

    const payload = {
      mobileNo: fullNumber,
      userName: formValue.username,
    };

    // console.log(payload);

    this.http.post(CONFIG.sendUserRegisterOtp, payload).subscribe({
      next: (res) => {
        this.toaster.success('OTP sent successfully!');
        this.otpSent = true;

        setTimeout(() => {
          if (this.otpInput0) {
            this.otpInput0.nativeElement.focus();
          }
        });
      },
      error: (err) => {
        this.toaster.error('Failed to send OTP.');
        console.error(err);
        this.otpSent = true;
      },
    });
  }
}
