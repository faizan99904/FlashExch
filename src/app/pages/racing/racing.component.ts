import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LiveStreemComponent } from '../../component/live-streem/live-streem.component';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-racing',
  imports: [CommonModule, LiveStreemComponent],
  templateUrl: './racing.component.html',
  styleUrl: './racing.component.css'
})
export class RacingComponent {
  isWithOdds = false;
  racingData: any;
  filterRacing: any = []
  sportId:any;
  // Store toggle state for each region
  collapsedRegions: { [key: number]: boolean } = {};

  constructor(private mainService: MainService,private route:ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.sportId = params['id'];
     
    })
    effect(() => {
      this.racingData = this.mainService.getAllRacingEvents();
      if (this.racingData) {
        console.log('racingData tournaments:', this.racingData);
        this.filterRacing = this.groupEventsByTournament(this.racingData.tournaments, this.racingData.events);
        console.log('racingData tournaments:', this.filterRacing);
      }

    })
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

}
