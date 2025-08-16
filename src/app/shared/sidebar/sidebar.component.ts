import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { MainService } from '../../service/main.service';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sportId: any;
  racingId: any
  parentIndex: any;
  childIndex: any;
  tournamentLength: any = [];
  filterCompetitions: any;
  AllEvents: any;
  activeRoute: any;
  currentRoute: any;
  inplayEventList: any;
  filterTopEvent: any = [];
  sidebarEvent: any = [];
  filterRacing: any = [];
  racingData: any = [];
  raceEvents: any[] = [];
  racingLength: any = []
  filteredSidebarEvent: any = [];
  tournamentData: any = [];
  racingTimeFilter: any = []
  activeDropdownIndex: number | null = null;
  dropdowns: { [key: string]: boolean } = {
    topLeagues: false,
    topLive: false,
    topEsport: false,
  };
  showSidebarContent = true;

  constructor(
    private router: Router,
    public mainService: MainService,
    private route: ActivatedRoute,
    private shared: SharedService,
    private cdr: ChangeDetectorRef
  ) {
    const routeUrl = this.router.url.split('/');
    this.currentRoute = this.router.url;
    const routeNameOne = routeUrl[1];
    this.racingId = routeUrl[2]
    this.activeRoute = routeNameOne;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.urlAfterRedirects.split('/');
        const routeName = urlSegments[1];

        this.activeRoute = routeName;
        this.currentRoute = event.url;
      }

      Promise.resolve().then(() => {
        setTimeout(() => {
          this.racingLength = this.shared.getRacingLength()();
        }, 10);
      });

    });

    effect(() => {

      this.sidebarEvent = mainService.getSideBarEvent();
      this.filterByTime();
      this.inplayEventList = mainService.getInplayEvents();
      this.filterInplay();
      this.racingData = this.mainService.getAllRacingEvents();
      if (this.racingData) {
        this.racingTimeFilter = this.filterEvents(this.racingData.data.events);
      }

      this.filterRacingEvent();
      this.AllEvents = this.mainService.getAllEvents();
      // this.RearrangingData(this.AllEvents)
      if (this.AllEvents) {
        const data = Object.values(this.AllEvents).flat();
        this.RearrangingData(data);
      }
      Promise.resolve().then(() => {
        this.racingLength = this.shared.getRacingLength()();
      });
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

  filterEvents(eventData: any) {
    const now = new Date();
    const thirtyMinutesLater = new Date(now.getTime() + 30 * 60 * 1000);

    return eventData
      .filter((event: any) => {
        // Filter by sportId
        const isCorrectSport = event.sportId === '4339' || event.sportId === '7';

        // Check if any event in eventsData is within the next 30 minutes
        const hasUpcomingEvent = event.eventsData.some((eventItem: any) => {
          const eventTime = new Date(eventItem.eventTime);
          return eventTime > now && eventTime <= thirtyMinutesLater;
        });

        return isCorrectSport && hasUpcomingEvent;
      })
      .map((event: any) => {
        // Keep only upcoming events and sort them by eventTime
        const filteredEvents = event.eventsData
          .filter((eventItem: any) => {
            const eventTime = new Date(eventItem.eventTime);
            return eventTime > now && eventTime <= thirtyMinutesLater;
          })
          .sort((a: any, b: any) => new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime());

        return {
          ...event,
          eventsData: filteredEvents
        };
      })
      // Finally, sort parent events by their first eventData time
      .sort((a: any, b: any) => {
        const timeA = new Date(a.eventsData[0].eventTime).getTime();
        const timeB = new Date(b.eventsData[0].eventTime).getTime();
        return timeA - timeB;
      });
  }




  filterInplay() {
    const allSubEvents: any[] = [];
    this.inplayEventList?.data?.forEach((event: any) => {
      if (Array.isArray(event?.data)) {
        allSubEvents.push(...event.data);
      }
    });
    const sorted = allSubEvents
      .filter((sub) => sub?.oddsData?.totalMatched != null)
      .sort((a, b) => b.oddsData.totalMatched - a.oddsData.totalMatched);
    this.filterTopEvent = sorted.slice(0, 5);
  }

  // filterRacingEvent() {
  //   [...this.racingData?.data?.events].forEach((event: any) => {
  //     console.log('event', event);
  //   });
  // }

  filterRacingEvent() {
    const uniqueEventsMap = new Map<string, any>();
    const events = this.racingData?.data?.events || [];

    events.forEach((event: any) => {
      if (event.inPlay === true) {
        uniqueEventsMap.set(event.eventId, event);
      }

      if (Array.isArray(event.eventsData)) {
        event.eventsData.forEach((subEvent: any) => {
          if (subEvent.inPlay === true) {
            uniqueEventsMap.set(subEvent.eventId, subEvent);
          }
        });
      }
    });

    const inPlayEvents = Array.from(uniqueEventsMap.values());
    this.raceEvents =
      inPlayEvents.length > 0 ? inPlayEvents : events.slice(0, 5);
  }

  // RearrangingData(data: any) {
  //   Object.values(data).flat().forEach((event: any) => {
  //     if (event.competitionId) {
  //       console.log(event);
  //     }
  //   })
  // }

  RearrangingData(data: any) {
    const uniqueSportsArray = data.reduce((acc: any[], item: any) => {
      const existingTournament = acc.find(
        (t: any) => t.competitionId === item?.tournamentId
      );

      if (existingTournament) {
        existingTournament.data.push(item);
      } else {
        acc.push({
          competitionId: item?.tournamentId,
          competitionName: item?.tournamentName,
          data: [item],
        });
      }

      return acc;
    }, []);

    uniqueSportsArray.forEach((tournament: any) => {
      tournament.data.sort((a: any, b: any) => {
        const matchedA = a?.oddsData?.totalMatched ?? 0;
        const matchedB = b?.oddsData?.totalMatched ?? 0;
        return matchedB - matchedA;
      });
    });

    const allMatches = [...uniqueSportsArray].flatMap(
      (tournament: any) => tournament.data
    );
    const getTournamentCount = [...uniqueSportsArray].flatMap(
      (tournament: any) => tournament.data
    );

    const sortedMatches = allMatches
      .filter((match: any) => match?.oddsData?.totalMatched != null)
      .sort(
        (a: any, b: any) => b.oddsData.totalMatched - a.oddsData.totalMatched
      );

    this.filterCompetitions = sortedMatches.slice(0, 5);

    [...this.filterCompetitions].forEach((event: any) => {
      // Find the tournament that contains this event
      const matchingTournament = uniqueSportsArray.find((sport: any) =>
        sport.data.some(
          (tournamentEvent: any) => tournamentEvent._id === event._id
        )
      );

      if (matchingTournament) {
        this.tournamentLength.push(matchingTournament.data.length);
        this.tournamentData.push(matchingTournament.data);
      }
    });
  }


  restSidebar() {
    this.parentIndex = null;
    this.childIndex = null
  }

  toggleLeagues(index: number): void {
    this.activeDropdownIndex =
      this.activeDropdownIndex === index ? null : index;
  }

  gotoLeagues(eventId: any, sportId: any) {
    this.router.navigateByUrl('/market-detail/' + sportId + '/' + eventId);
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

  resetSidebar() {
    this.parentIndex = null;
    this.childIndex = null;
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

  gotoMarket(market: any) {
    localStorage.setItem('competitionName', market.tournamentName);
    this.router.navigateByUrl(
      '/market-detail/' + market.sportId + '/' + market.exEventId
    );
  }

  gotoMarketRacing(market: any) {
    localStorage.setItem('competitionName', market.eventName);
    this.router.navigateByUrl(
      '/market-detail/' + this.sportId + '/' + market.eventId
    );
  }

  sendRacingId(sportId: number) {
    this.racingId = sportId;
  }
}
