import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private mobileSidebarToggleSource = new Subject<boolean>();
  mobileSidebarToggle$ = this.mobileSidebarToggleSource.asObservable();

  private signUpToggle = signal(false);
  readonly isSignupVisible = this.signUpToggle.asReadonly();

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
}
