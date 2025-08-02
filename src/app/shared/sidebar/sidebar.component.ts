import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sportId: any;
  parentIndex: any;
  childIndex: any;
  activeRoute: any;
  currentRoute: any;
  sidebarEvent: any = [];
  filteredSidebarEvent: any = [];
  dropdowns: { [key: string]: boolean } = {
    topLeagues: false,
    topLive: false,
    topEsport: false,
  };
  showSidebarContent = true;

  constructor(
    private router: Router,
    public mainService: MainService,
    private route: ActivatedRoute
  ) {
    const routeUrl = this.router.url.split('/');
    this.currentRoute = this.router.url;
    const routeNameOne = routeUrl[1];
    this.activeRoute = routeNameOne;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.urlAfterRedirects.split('/');
        const routeName = urlSegments[1];
        this.activeRoute = routeName;
        this.currentRoute = event.url;
      }
    });

    effect(() => {
      this.sidebarEvent = mainService.getSideBarEvent();
      this.filterByTime();
    });
  }

  timeFilter = 'All';
  topLiveGames = {
    soccer: [
      {
        team1: 'Brentford (SRL)',
        team2: 'Mainz (SRL)',
        odds: ['3.25', '2.50', '2.75'],
      },
      {
        team1: 'Rakow Czestochowa',
        team2: 'FK Austria Wien',
        odds: ['2.95', '2.40', '3.10'],
      },
      {
        team1: 'Paris Saint Germain',
        team2: 'FC Bayern Munich',
        odds: ['15.00', '3.65', '1.12'],
      },
    ],
    basketball: [
      { team1: 'Tigers', team2: 'Lions', odds: ['5.30', '1.10'] },
      {
        team1: 'Ningbo Waves',
        team2: 'Shenyang Seagulls',
        odds: ['1.75', '1.95'],
      },
      {
        team1: 'Los Angeles Lakers',
        team2: 'Oklahoma City Thunder',
        odds: ['1.73', '1.95'],
      },
    ],
  };

  toggleDropdown(name: string) {
    this.dropdowns[name] = !this.dropdowns[name];
  }

  setTimeFilter(filter: string) {
    this.timeFilter = filter;
  }

  sidebarSportToggle(index: any) {
    if (this.parentIndex === index) {
      this.parentIndex = null;
      this.childIndex = null;
    } else {
      this.parentIndex = index;
    }
  }

  subChildIndex(index: any) {
    if (this.childIndex === index) {
      this.childIndex = null;
    } else {
      this.childIndex = index;
    }
  }

  filterByTime() {
    const filterHoursMap: any = {
      '6H': 6,
      '12H': 12,
      '24H': 24,
      '48H': 48,
    };

    const hours = filterHoursMap[this.timeFilter] || 0;
    const now = new Date();
    const future = new Date(now.getTime() + hours * 60 * 60 * 1000);
    const filteredData = this.sidebarEvent?.data
      ?.map((sport: any) => {
        const filteredTournaments = sport.data
          .map((tournament: any) => {
            const filteredMarkets = tournament.data.filter((market: any) => {
              const eventTime = new Date(market.eventTime);
              return hours === 0 || eventTime <= future;
            });
            return {
              ...tournament,
              data: filteredMarkets,
            };
          })
          .filter((t: any) => t.data.length > 0);

        return {
          ...sport,
          data: filteredTournaments,
        };
      })
      .filter((s: any) => s.data.length > 0);

    this.filteredSidebarEvent = filteredData;
  }

  gotoMarket(market: any, index: any) {
    localStorage.setItem('competitionName', market.tournamentName);
    this.router.navigateByUrl(
      '/market-detail/' + market.sportId + '/' + market.exEventId
    );
  }
}
