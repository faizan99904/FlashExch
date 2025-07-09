import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-racing',
  imports: [CommonModule],
  templateUrl: './racing.component.html',
  styleUrl: './racing.component.css'
})
export class RacingComponent {
  isWithOdds = false;
  // Store toggle state for each region
  collapsedRegions: { [key: number]: boolean } = {};
  expandedChamps: { [champKey: string]: boolean } = {};

  toggleChampExpansion(regionIndex: number, champIndex: number): void {
    const key = `${regionIndex}_${champIndex}`;
    this.expandedChamps[key] = !this.expandedChamps[key];
  }

  isChampExpanded(regionIndex: number, champIndex: number): boolean {
    return !!this.expandedChamps[`${regionIndex}_${champIndex}`];
  }

  regions = [
    {
      country: 'greatbritain',
      title: 'Great Britain (Tomorrow)',
      champs: [
        {
          name: 'Uttoxeter',
          state: '',
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
      title: 'Ireland (Tomorrow)',
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
