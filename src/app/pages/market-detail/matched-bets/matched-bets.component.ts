import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { SharedService } from '../../../service/shared.service';

@Component({
  selector: 'app-matched-bets',
  imports: [CommonModule],
  templateUrl: './matched-bets.component.html',
  styleUrl: './matched-bets.component.css',
})
export class MatchedBetsComponent {
  unmatchedBets: boolean = false;
  matchedBets: boolean = false;
  matchedData: any;
  @Input() matchedBet: any[] = [];

  constructor(private shared: SharedService) {
    effect(() => {
      this.matchedData = this.shared.getMatchedBets()();
    });
  }
}
