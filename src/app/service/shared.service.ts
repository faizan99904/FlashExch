import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private mobileSidebarToggleSource = new Subject<boolean>();
  private isLogin = new Subject<string>();
  mobileSidebarToggle$ = this.mobileSidebarToggleSource.asObservable();

  private signUpToggle = signal(false);
  readonly isSignupVisible = this.signUpToggle.asReadonly();

  private passToggle = signal(false);
  readonly isPassVisible = this.passToggle.asReadonly();
  readonly extended = signal(false);

  getToken() {
    return this.isLogin;
  }

  setToken(value: any) {
    const token = localStorage.getItem('token');
    this.isLogin.next(value);
  }

  togglePass(): void {
    this.passToggle.update((value) => !value);
  }

  showPass(): void {
    this.passToggle.set(true);
  }

  hidePass(): void {
    this.passToggle.set(false);
  }

  toggleSignup(): void {
    this.signUpToggle.update((value) => !value);
  }

  showSignup(): void {
    this.signUpToggle.set(true);
  }

  hideSignup(): void {
    this.signUpToggle.set(false);
  }

  mobileSidebarOpen() {
    this.mobileSidebarToggleSource.next(true);
  }

  mobileSidebarClose() {
    this.mobileSidebarToggleSource.next(false);
  }

  toggle() {
    this.extended.set(!this.extended());
  }

  setState(value: boolean) {
    this.extended.set(value);
  }

  getState(): boolean {
    return this.extended();
  }
}
