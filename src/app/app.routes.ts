import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SportsBookComponent } from './pages/sports-book/sports-book.component';

import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'passwordrecovery',
    loadComponent: () => import('./auth/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
  },

  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: '',
        component: SportsBookComponent
      },
      {
        path: 'market-detail',
        loadComponent: () => import('./pages/market-detail/market-detail.component').then(m => m.MarketDetailComponent),
      },
      {
        path: 'market-detail/:sportId/:eventId',
        loadComponent: () => import('./pages/market-detail/market-detail.component').then(m => m.MarketDetailComponent),
      },
      {
        path: 'ballByBall/:sportId/:eventId',
        loadComponent: () => import('./pages/ballbyball/ballbyball.component').then(m => m.BallbyballComponent),
      },

      {
        path: 'racing/:id',
        loadComponent: () => import('./pages/racing/racing.component').then(m => m.RacingComponent),
      },
      {
        path: 'competitions/:id',
        loadComponent: () => import('./pages/competitions/competitions.component').then(m => m.CompetitionsComponent),
      },
      {
        path: 'virtual',
        loadComponent: () => import('./pages/virtual/virtual.component').then(m => m.VirtualComponent),
      },


      // ye use ni hora...bad me remove krdein gy
      {
        path: 'live',
        loadComponent: () => import('./live-page/live-page.component').then(m => m.LivePageComponent),


        children: [
          {
            path: 'event-view',
            loadComponent: () => import('./component/event-view/event-view.component').then(m => m.EventViewComponent),
          },
        ],
      },
      {
        path: 'inplay',
        loadComponent: () => import('./shared/inplay/inplay.component').then(m => m.InplayComponent),
      },
      {
        path: 'casino',
        loadComponent: () => import('./pages/casino/casino.component').then(m => m.CasinoComponent),
      },
      {
        path: 'live-casino',
        loadComponent: () => import('./pages/live-casino/live-casino.component').then(m => m.LiveCasinoComponent),
      },
      {
        path: 'promos',
        loadComponent: () => import('./pages/promos/promos.component').then(m => m.PromosComponent),
      },
      {
        path: 'affliate',
        loadComponent: () => import('./pages/affliate/affliate.component').then(m => m.AffliateComponent),
      },
      {
        path: 'minigames',
        loadComponent: () => import('./pages/minigames/minigames.component').then(m => m.MinigamesComponent),
      },
      {
        path: 'lottery',
        loadComponent: () => import('./shared/lottery/lottery.component').then(m => m.LotteryComponent),
      },
      {
        path: 'news',
        loadComponent: () => import('./pages/news/tips-and-previews/tips-and-previews.component').then(m => m.TipsAndPreviewsComponent),
      },
      {
        path: 'lottery-details/:sportId/:eventId',
        loadComponent: () => import('./shared/lottery-details/lottery-details.component').then(m => m.LotteryDetailsComponent),
      },
      {
        path: 'sport',
        loadComponent: () => import('./pages/sport/sport.component').then(m => m.SportComponent),
      },
      {
        path: 'banking/withdraw',
        loadComponent: () => import('./pages/banking/withdraw/withdraw.component').then(m => m.WithdrawComponent),
      },
      {
        path: 'banking/withdrawdetails',
        loadComponent: () => import('./pages/banking/withdraw-details/withdraw-details.component').then(m => m.WithdrawDetailsComponent),
      },
      {
        path: 'banking/deposit/:id',
        loadComponent: () => import('./pages/banking/deposit/deposit.component').then(m => m.DepositComponent),
      },
      {
        path: 'banking/deposit-details/:id',
        loadComponent: () => import('./pages/banking/deposit-details/deposit-details.component').then(m => m.DepositDetailsComponent),
      },
      {
        path: 'banking/payment-waiting/:amount/:utr/:method',
        loadComponent: () => import('./pages/banking/payment-waiting/payment-waiting.component').then(m => m.PaymentWaitingComponent),
      },

    ],
  },

  {
    path: 'account',
    component: AccountLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/accont/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'personalinfo',
        loadComponent: () => import('./pages/accont/personal-information/personal-information.component').then(m => m.PersonalInformationComponent),
      },
      {
        path: 'transactions',
        loadComponent: () => import('./pages/accont/transactions-history/transactions-history.component').then(m => m.TransactionsHistoryComponent),
      },
      {
        path: 'bonuses',
        loadComponent: () => import('./pages/accont/bonuses/bonuses.component').then(m => m.BonusesComponent),
      },
      {
        path: 'freespins',
        loadComponent: () => import('./pages/accont/freespins/freespins.component').then(m => m.FreespinsComponent),
      },
      {
        path: 'kyc',
        loadComponent: () => import('./pages/accont/kyc/kyc.component').then(m => m.KycComponent),
      },
      {
        path: 'change-password',
        loadComponent: () => import('./pages/accont/change-password/change-password.component').then(m => m.ChangePasswordComponent),
      },
      {
        path: 'profit-loss',
        loadComponent: () => import('./pages/accont/profit-loss/profit-loss.component').then(m => m.ProfitLossComponent),
      },
      {
        path: 'bet-history',
        loadComponent: () => import('./pages/accont/bet-history/bet-history.component').then(m => m.BetHistoryComponent),
      },
      {
        path: 'activity-log',
        loadComponent: () => import('./pages/accont/activity-log/activity-log.component').then(m => m.ActivityLogComponent),
      },
      {
        path: 'account-statement',
        loadComponent: () => import('./pages/accont/account-statement/account-statement.component').then(m => m.AccountStatementComponent),
      },
      {
        path: 'password-history',
        loadComponent: () => import('./pages/accont/password-history/password-history.component').then(m => m.PasswordHistoryComponent),
      },
      {
        path: 'nav',
        loadComponent: () => import('./pages/account-nav/account-nav.component').then(m => m.AccountNavComponent),
      },
      {
        path: 'profitloss-event/:sportId/:startDate/:endDate',
        loadComponent: () => import('./pages/accont/profitloss-event/profitloss-event.component').then(m => m.ProfitlossEventComponent),
      },
      {
        path: 'profitloss-market/:eventId/:sportId',
        loadComponent: () => import('./pages/accont/profitloss-market/profitloss-market.component').then(m => m.ProfitlossMarketComponent),
      },
      {
        path: 'profit-history/:sportId/:eventId',
        loadComponent: () => import('./pages/accont/profit-history/profit-history.component').then(m => m.ProfitHistoryComponent),
      },
    ],
  },
];
