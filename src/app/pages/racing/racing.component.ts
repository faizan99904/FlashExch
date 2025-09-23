import { CommonModule } from '@angular/common';
import { Component, effect, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { LiveStreemComponent } from '../../component/live-streem/live-streem.component';
import { MainService } from '../../service/main.service';
import { elementAt } from 'rxjs';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-racing',
  imports: [CommonModule, LiveStreemComponent, RouterLink],
  templateUrl: './racing.component.html',
  styleUrl: './racing.component.css'
})
export class RacingComponent implements OnChanges {
  isWithOdds = false;
  @Input() getSportId: any
  @Input() homeSearch: any
  racingData: any;
  filterRacing: any = [];
  searchFilter: any = [];
  dayValue: string = 'all'
  getCount: any = []
  greyhoundLength: any = []
  horseLength: any = []
  sportId: any;
  // Store toggle state for each region
  collapsedRegions: { [key: number]: boolean } = {};

  constructor(private mainService: MainService, private route: ActivatedRoute, private router: Router, private sharedService: SharedService) {
    this.route.params.subscribe(params => {
      if (params && params['id']) {
        this.sportId = params['id'];
      } else if (this.getSportId) {
        this.sportId = this.getSportId;
      }
    })

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.racingData = this.mainService.getAllRacingEvents();
        this.filterRacing = this.groupEventsByTournament(this.racingData?.data.tournaments, this.racingData?.data.events);
        this.searchRacing('');

      }
    })


    effect(() => {
      this.racingData = this.mainService.getAllRacingEvents();
      const id = this.mainService.getActiveSport();
      if (this.getSportId) {
        this.sportId = this.getSportId;
      }

      if (this.racingData) {

        this.filterRacing = this.groupEventsByTournament(this.racingData?.data.tournaments, this.racingData?.data.events);
        this.getCount = this.sportCount(this.racingData?.data.events)
      }
      this.searchRacing('');
    });

  }



  ngOnChanges(): void {
    if (this.homeSearch) {
      const searchValue = this.homeSearch.trim().toLowerCase();
      this.searchFilter = this.filterRacing.filter((tournament: any) => {
        if (tournament.tournamentName.toLowerCase().includes(searchValue)) {
          return true;
        }
        return tournament.events.some((event: any) => {
          return event.eventName.toLowerCase().includes(searchValue)
        });
      });
    }
  }


  groupEventsByTournament(
    tournaments: any[],
    events: any[]
  ): any[] {
    const currentSportId = this.sportId;


    const filteredTournaments = tournaments
      .filter(t => t.sportId === currentSportId)
      .map(t => ({ ...t, events: t.events ?? [] }));


    const byId = new Map<number, any>(
      filteredTournaments.map(t => [t.tournamentId, t])
    );


    events.forEach(ev => {
      if (ev.sportId !== currentSportId) return;
      byId.get(ev.tournamentId)?.events.push(ev);
    });

    return filteredTournaments;
  }


  expandedChamps: { [champKey: string]: boolean } = {};
  isToggleVideoStream = false;

  get imageSrc(): string {
    return this.isToggleVideoStream
      ? '/assets/images/racing/uncheck.png'
      : '/assets/images/racing/check.png';
  }

  toggleVideoStream(): void {
    this.isToggleVideoStream = !this.isToggleVideoStream;
  }

  toggleChampExpansion(regionIndex: number, champIndex: number): boolean {
    const key = `${regionIndex}_${champIndex}`;
    this.expandedChamps[key] = !this.expandedChamps[key];
    return this.expandedChamps[key];
  }

  sportCount(events: any[]) {
    this.greyhoundLength = events
      .filter(event => event.sportId === '4339')
      .flatMap(item => item.eventsData || []);

    this.horseLength = events
      .filter(event => event.sportId === '7')
      .flatMap(item => item.eventsData || []);
    this.sharedService.setRacingLength([this.horseLength.length, this.greyhoundLength.length])
  }




  isChampExpanded(regionIndex: number, champIndex: number): boolean {
    return !!this.expandedChamps[`${regionIndex}_${champIndex}`];
  }

  regions = [
    {
      country: 'greatbritain',
      title: 'Great Britain',
      champs: [
        {
          name: 'Uttoxeter',
          state: '',
          matches: [
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '19:04', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:30', link: '#/racing/match/16140778_25' }
          ]
        }, {
          name: 'Uttoxeter',
          state: 'finished',
          matches: [
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:30', link: '#/racing/match/16140778_25' }
          ]
        }, {
          name: 'Uttoxeter',
          state: '',
          matches: [
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:30', link: '#/racing/match/16140778_25' }
          ]
        }, {
          name: 'Uttoxeter',
          state: '',
          matches: [
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:00', link: '#/racing/match/16140774_25' },
            { time: '00:30', link: '#/racing/match/16140778_25' }
          ]
        },
        // more champs...
      ]
    },
    {
      country: 'ireland',
      title: 'Ireland',
      champs: [
        {
          name: 'Tramore',
          state: 'active',
          matches: [
            { time: '00:20', link: '#/racing/match/3125579_26', },
            { time: '00:20', link: '#/racing/match/3125579_26' },
            { time: '00:20', link: '#/racing/match/3125579_26' },
            { time: '00:20', link: '#/racing/match/3125579_26' },
            { time: '00:20', link: '#/racing/match/3125579_26', },
            { time: '00:20', link: '#/racing/match/3125579_26' },
            { time: '00:20', link: '#/racing/match/3125579_26' },
            { time: '00:20', link: '#/racing/match/3125579_26' }
          ]
        }
      ]
    }
    // more regions...
  ];

  toggleRegion(index: number): void {
    this.collapsedRegions[index] = !this.collapsedRegions[index];
  }

  isCollapsed(index: number): boolean {
    return this.collapsedRegions[index];
  }
  toggleOdds() {
    this.isWithOdds = !this.isWithOdds;
  }

  searchRacing(value: string) {
    if (value.length > 1) {
      const searchValue = value.trim().toLowerCase();
      this.searchFilter = this.filterRacing.filter((tournament: any) => {
        if (tournament.tournamentName.toLowerCase().includes(searchValue)) {
          return true;
        }
        return tournament.events.some((event: any) => {
          return event.eventName.toLowerCase().includes(searchValue)
        });
      });
    } else {
      this.searchFilter = [...this.filterRacing];
    }
  }

  daysFilter(day: string) {
    this.dayValue = day;
    if (day === 'all') {
      this.searchFilter = [...this.filterRacing];
      return;
    }
    const targetDate = new Date();
    if (day === 'tomorrow') {
      targetDate.setDate(targetDate.getDate() + 1);
    }
    const dateString = targetDate.toISOString().split('T')[0];

    this.searchFilter = this.filterRacing
      .map((tournament: any) => {
        const filteredEvents = tournament.events
          .map((event: any) => {

            const filteredEventsData = event.eventsData
              .filter((eventData: any) => eventData.eventTime.includes(dateString));
            return filteredEventsData.length > 0
              ? { ...event, eventsData: filteredEventsData }
              : null;
          })
          .filter((event: any) => event !== null);

        return filteredEvents.length > 0
          ? { ...tournament, events: filteredEvents }
          : null;
      })
      .filter((tournament: any) => tournament !== null);
  }
  gotoMarket(market: any) {
    localStorage.setItem('competitionName', market.eventName);
    // console.log(market);

    this.router.navigateByUrl(
      '/market-detail/' + this.sportId + '/' + market.eventId
    );
  }
}
