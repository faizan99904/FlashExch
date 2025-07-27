import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
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

  // Store toggle state for each region
  collapsedRegions: { [key: number]: boolean } = {};

  constructor(private mainService: MainService) {
    effect(() => {
      this.racingData = this.mainService.getAllRacingEvents();
      if (this.racingData && this.racingData.events && this.racingData.tournaments) {
        this.groupEventsByTournament(this.racingData.tournaments, this.racingData.events)
      }

    })
  }

  groupEventsByTournament(tournaments: any[], events: any[]) {
    this.filterRacing = events.filter(tournament =>
      events.some(event => event.tournamentId === tournament.tournamentId)
    );
    console.log('Matching tournaments:', this.filterRacing);
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
