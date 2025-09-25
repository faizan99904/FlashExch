import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { SharedService } from '../service/shared.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const sharedService = inject(SharedService);
  const width = window.innerWidth

  const shouldSkipTokenInjection = (url: string): boolean => {
    const skipUrls = ['/login', '/register'];
    return skipUrls.some((skipUrl) => url.includes(skipUrl));
  };

  if (shouldSkipTokenInjection(req.url)) {
    return next(req);
  }

  const authToken = localStorage.getItem('token') || '';
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return next(newReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.clear();
          router.navigate(['/login']);
    
      }
      return throwError(() => error);
    })
  );
};