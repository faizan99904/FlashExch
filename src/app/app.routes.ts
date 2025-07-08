import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { SportsBookComponent } from '../pages/sports-book/sports-book.component';
import { LoginComponent } from '../auth/login/login.component';
import { MarketDetailComponent } from '../pages/market-detail/market-detail.component';
import { CasinoComponent } from '../pages/casino/casino.component';
import { ForgetPasswordComponent } from '../auth/forget-password/forget-password.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'passwordrecovery', component: ForgetPasswordComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SportsBookComponent },
      { path: 'market-detail', component: MarketDetailComponent },
    ],
  },
  { path: 'casino', component: CasinoComponent },
];
