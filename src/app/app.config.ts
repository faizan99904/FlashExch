import { DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, NgZone, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


import { routes } from './app.routes';
import { AngularFirestoreBinary, AngularFirestoreCricket, AngularFirestoreOther, AngularFirestoreScore, AngularFirestoreSoccer, AngularFirestoreTennis } from './service/firebase.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    DatePipe,
    {
      provide: 'firebaseProjectCricket',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreCricket
  },
  {
      provide: 'firebaseProjectTennis',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreTennis
  },
  {
      provide: 'firebaseProjectSoccer',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreSoccer
  },
  {
      provide: 'firebaseProjectBinary',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreBinary
  },
  {
      provide: 'firebaseProjectOther',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreOther
  },
  {
      provide: 'firebaseProjectScore',
      deps: [PLATFORM_ID, NgZone],
      useFactory: AngularFirestoreScore
  },
  ]
};


