import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../service/shared.service';
import { MainService } from '../../service/main.service';
import { Router, RouterLink } from '@angular/router';
import { MarketComponent } from "../../component/market/market.component";
import { NetworkService } from '../../service/network.service';

@Component({
  selector: 'app-mobile-sidebar',
  imports: [CommonModule, RouterLink, MarketComponent],
  templateUrl: './mobile-sidebar.component.html',
  styleUrl: './mobile-sidebar.component.css',
})
export class MobileSidebarComponent {
  @Input() searchTab!: string;
  activeDropdownIndex: number | null = null;
  dropdownOpen = false;
  filterCompetitions: any = []
  dropdownHeight = '0px';
  tournamentLength: any = [];
  tournamentData: any = []
  activeIndex: any;
  selectedFilterid: any = [];
  filteredEvents: any = [];
  ids: any = [];
  AllEvents: any
  interval!: boolean;
  filterArray: any = [];
  EventsList: any = [];
  isMobile: boolean = false;
  @ViewChild('dropdownList') dropdownList!: ElementRef;

  languages = [
    {
      code: 'EN',
      label: 'EN - English',
      flag: 'https://flagcdn.com/w40/gb.png',
    },
    {
      code: 'BR',
      label: 'BR - Portuguese',
      flag: 'https://flagcdn.com/w40/br.png',
    },
    {
      code: 'ES',
      label: 'ES - Español',
      flag: 'https://flagcdn.com/w40/es.png',
    },
    {
      code: 'FR',
      label: 'FR - Français',
      flag: 'https://flagcdn.com/w40/fr.png',
    },
    {
      code: 'DE',
      label: 'DE - Deutsch',
      flag: 'https://flagcdn.com/w40/de.png',
    },
    {
      code: 'FI',
      label: 'FI - Finnish',
      flag: 'https://flagcdn.com/w40/fi.png',
    },
    { code: 'NO', label: 'NO - Norsk', flag: 'https://flagcdn.com/w40/no.png' },
    {
      code: 'IT',
      label: 'IT - Italiano',
      flag: 'https://flagcdn.com/w40/it.png',
    },
    {
      code: 'RU',
      label: 'RU - Русский',
      flag: 'https://flagcdn.com/w40/ru.png',
    },
  ];

  selectedLanguage = this.languages[0];
  isVisible = false;
  private sub!: Subscription;

  constructor(
    private sharedService: SharedService,
    private renderer: Renderer2,
    public mainService: MainService,
    private router: Router,
    private networkService: NetworkService
  ) {
    this.selectedFilterid = JSON.parse(
      localStorage.getItem(`multiMarket_${this.sharedService.username()}`) ??
      '[]'
    );
    const filterData: any[] = this.selectedFilterid;
    this.ids = filterData;
    effect(() => {
      this.activeIndex = this.mainService.getActiveSport();
      this.EventsList = this.mainService.getAllEvents();


      // this.RearrangingData(this.AllEvents)
      if (this.EventsList) {
        this.getAllEvents();
        const data = Object.values(this.EventsList).flat();
        this.RearrangingData(data);
      }

    });
  }

  ngOnInit(): void {
    this.sub = this.sharedService.mobileSidebarToggle$.subscribe((show) => {
      this.isVisible = show;
      const mainRouterEl = document.querySelector('.mainRouter');
      if (mainRouterEl) {
        if (show) {
          mainRouterEl.classList.add('prevent-scroll');
        } else {
          mainRouterEl.classList.remove('prevent-scroll');
        }
      }
    });
  }

  getAllEvents() {
    this.interval = true;
    this.filterArray = [];
    if (this.ids) {
      for (let sportid of this.ids) {
        this.filteredEvents = this.EventsList[sportid.sportId];
        this.filteredEvents.forEach((element: any) => {
          if (element.exEventId === sportid.eventid) {
            this.filterArray.push(element);
          }
        });
        setTimeout(() => {
          this.interval = false;
        }, 300);
        this.filteredEvents = this.filterArray;
      }
    }
  }

  trackByFn(index: any) {
    return index;
  }

  closeSidebar() {
    this.sharedService.mobileSidebarClose();
    const mainRouterEl = document.querySelector('.mainRouter');
    if (mainRouterEl) {
      mainRouterEl.classList.remove('prevent-scroll');
    }
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  //   const mainRouterEl = document.querySelector('.mainRouter');
  //   if (mainRouterEl) {
  //     mainRouterEl.classList.remove('prevent-scroll');
  //   }
  // }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    setTimeout(() => {
      this.dropdownHeight = this.dropdownOpen
        ? `${this.dropdownList?.nativeElement.scrollHeight}px`
        : '0px';
    }, 10);
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
    this.dropdownHeight = '0px';
  }

  selectLanguage(lang: any): void {
    this.selectedLanguage = lang;
    this.toggleDropdown();
  }

  navigateMarket(sportName: any, sportId: any) {
    if (sportName === 'Horse Racing' || sportName === 'Greyhound Racing') {
      this.router.navigateByUrl(`racing/${sportId}`);
    } else {
      this.router.navigateByUrl(`competitions/${sportId}`);
    }
    this.closeSidebar();
  }

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


  gotoLeagues(event: any) {
    this.networkService.gotoMarket(event);
    this.closeSidebar()
  }

  toggleLeagues(index: number): void {
    this.activeDropdownIndex =
      this.activeDropdownIndex === index ? null : index;


  }
}