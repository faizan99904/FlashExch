import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SportsBookComponent } from './pages/sports-book/sports-book.component';
import { LoginComponent } from './auth/login/login.component';
import { MarketDetailComponent } from './pages/market-detail/market-detail.component';
import { CasinoComponent } from './pages/casino/casino.component';

import { RacingComponent } from './pages/racing/racing.component';

import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { PromosComponent } from './pages/promos/promos.component';
import { LiveCasinoComponent } from './pages/live-casino/live-casino.component';
import { AccountLayoutComponent } from './account-layout/account-layout.component';
import { DashboardComponent } from './pages/accont/dashboard/dashboard.component';

import { AffliateComponent } from './pages/affliate/affliate.component';

import { LivePageComponent } from './live-page/live-page.component';

import { EventViewComponent } from './component/event-view/event-view.component';

import { PersonalInformationComponent } from './pages/accont/personal-information/personal-information.component';
import { DepositComponent } from './pages/accont/deposit/deposit.component';
import { WithdrawComponent } from './pages/accont/withdraw/withdraw.component';
import { TransactionsHistoryComponent } from './pages/accont/transactions-history/transactions-history.component';
import { BonusesComponent } from './pages/accont/bonuses/bonuses.component';
import { FreespinsComponent } from './pages/accont/freespins/freespins.component';
import { KycComponent } from './pages/accont/kyc/kyc.component';
import { ChangePasswordComponent } from './pages/accont/change-password/change-password.component';
import { AccountNavComponent } from './pages/account-nav/account-nav.component';
import { ProfitLossComponent } from './pages/accont/profit-loss/profit-loss.component';
import { CompetitionsComponent } from './pages/competitions/competitions.component';
import { MinigamesComponent } from './pages/minigames/minigames.component';
import { BetHistoryComponent } from './pages/accont/bet-history/bet-history.component';
import { ActivityLogComponent } from './pages/accont/activity-log/activity-log.component';
import { AccountStatementComponent } from './pages/accont/account-statement/account-statement.component';
import { PasswordHistoryComponent } from './pages/accont/password-history/password-history.component';
import { ProfitlossEventComponent } from './pages/accont/profitloss-event/profitloss-event.component';
import { ProfitlossMarketComponent } from './pages/accont/profitloss-market/profitloss-market.component';
import { ProfitHistoryComponent } from './pages/accont/profit-history/profit-history.component';
import { LotteryComponent } from './shared/lottery/lottery.component';
import { TipsAndPreviewsComponent } from './pages/news/tips-and-previews/tips-and-previews.component';
import { InplayComponent } from './shared/inplay/inplay.component';

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
      {
        path: 'market-detail/:sportId/:eventId',
        component: MarketDetailComponent,
      },
      { path: 'racing/:id', component: RacingComponent },
      { path: 'competitions/:id', component: CompetitionsComponent },

      {
        path: 'live',
        component: LivePageComponent,

        children: [
          {
            path: 'event-view',
            component: EventViewComponent,
          },
        ],
      },
      { path: 'inplay', component: InplayComponent },

      { path: 'casino', component: CasinoComponent },
      { path: 'live-casino', component: LiveCasinoComponent },
      { path: 'promos', component: PromosComponent },
      { path: 'affliate', component: AffliateComponent },
      { path: 'minigames', component: MinigamesComponent },
      { path: 'lottery', component: LotteryComponent },
      { path: 'news', component: TipsAndPreviewsComponent },

    ],
  },

  {
    path: 'account',
    component: AccountLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'personalinfo', component: PersonalInformationComponent },
      { path: 'deposit', component: DepositComponent },
      { path: 'withdraw', component: WithdrawComponent },
      { path: 'transactions', component: TransactionsHistoryComponent },
      { path: 'bonuses', component: BonusesComponent },
      { path: 'freespins', component: FreespinsComponent },
      { path: 'kyc', component: KycComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'profit-loss', component: ProfitLossComponent },
      { path: 'bet-history', component: BetHistoryComponent },
      { path: 'activity-log', component: ActivityLogComponent },
      { path: 'account-statement', component: AccountStatementComponent },
      { path: 'password-history', component: PasswordHistoryComponent },
      { path: 'nav', component: AccountNavComponent },
      {
        path: 'profitloss-event/:sportId/:startDate/:endDate',
        component: ProfitlossEventComponent,
      },
      {
        path: 'profitloss-market/:eventId/:sportId',
        component: ProfitlossMarketComponent,
      },
      {
        path: 'profit-history/:sportId/:eventId',
        component: ProfitHistoryComponent,
      },
    ],
  },
];
