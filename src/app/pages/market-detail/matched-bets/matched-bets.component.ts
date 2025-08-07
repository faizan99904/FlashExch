import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-matched-bets',
  imports: [CommonModule],
  templateUrl: './matched-bets.component.html',
  styleUrl: './matched-bets.component.css',
})
export class MatchedBetsComponent {
  unmatchedBets: boolean = true;
  matchedBets: boolean = true;
}
