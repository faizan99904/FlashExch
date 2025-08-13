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
  isLiveStreaming:boolean = false
  matchedData: any;
  constructor(private shared: SharedService) {
    effect(() => {
      const data = this.shared.getMatchedBets()();
      this.matchedData = Array.isArray(data) ? data : [];
    });
  }
}
