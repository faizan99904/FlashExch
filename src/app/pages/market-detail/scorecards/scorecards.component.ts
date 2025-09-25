import { Component, Input, } from '@angular/core';
import { TennisComponent } from './tennis/tennis.component';
import { CricketComponent } from './cricket/cricket.component';
import { SoccerComponent } from './soccer/soccer.component';
import {  NgIf } from '@angular/common';

@Component({
  selector: 'app-scorecards',
  templateUrl: './scorecards.component.html',
  styleUrls: ['./scorecards.component.css'],
  standalone: true,
  imports: [CricketComponent,TennisComponent,SoccerComponent,NgIf],
})

export class ScorecardsComponent {
  @Input() sportObj: any = [];
  @Input() isMuted: any = [];
  @Input() isScore: any ;
}
