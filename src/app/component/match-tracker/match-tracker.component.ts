import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-match-tracker',
  imports: [CommonModule],
  templateUrl: './match-tracker.component.html',
  styleUrl: './match-tracker.component.css',
})
export class MatchTrackerComponent implements OnInit {
  iframe: boolean = true;
  betSlip: boolean = true;
  extended!: Signal<boolean>;

  constructor(private toggle: SharedService) {}

  ngOnInit(): void {
    this.extended = this.toggle.extended;
  }

  extendScreen() {
    this.toggle.toggle();
    console.log(this.extended());
  }

  closeIframe() {
    this.iframe = !this.iframe;
  }

  closeBetSlip() {
    this.betSlip = !this.betSlip;
  }
}
