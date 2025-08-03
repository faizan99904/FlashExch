import { computed, Injectable, signal } from '@angular/core';
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

  private colorSignal = signal<string>('#86efac');
  readonly color = this.colorSignal.asReadonly();

  readonly colorType = computed(() => {
    const color = this.colorSignal();
    if (color === '#aed8ff') return 'back';
    if (color === '#f1bed2') return 'lay';
    return 'sportbook';
  });

  setColorByType(type: string) {
    const colorMap: Record<string, string> = {
      back: '#aed8ff',
      lay: '#f1bed2',
      sportbook: '#86efac',
    };

    this.colorSignal.set(colorMap[type] || '#86efac');
  }

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
