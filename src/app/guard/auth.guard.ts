import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = localStorage.getItem('token');
  const userDetail = localStorage.getItem('userDetail')
  const width = window.innerWidth
  if (token && userDetail) {
    return true;
  } else {
    if (width < 819) {
      router.navigateByUrl('/login');
    } else {
      router.navigateByUrl('/');
    }
    return false;
  }
};
