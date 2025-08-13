import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NetworkService } from '../../../service/network.service';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent implements OnInit {
  isResultModal:boolean = false
  selectedResult: any ={
    streamUrl:'',
    marketId:'',
    result:'',
    eventName:'',
  };
  @Input() resultArray: any = [];
  constructor(
    private networkService: NetworkService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.networkService.getResultstream().subscribe((data: any) => {
      this.resultArray = data;
    });
  }
  setResults(result: any) {
    this.selectedResult = {
      streamUrl:'',
      marketId:'',
      result:'',
      eventName:'',
    };
    document.body.style.overflow = 'hidden';
    this.selectedResult = result;
    this.isResultModal = true

    this.selectedResult = JSON.parse(JSON.stringify(result));
    this.cdr.detectChanges();
    const currentOrigin = window.location.origin;
    // this.selectedResult.streamUrl = result.streamUrl.replace('{$domain}', 'https://casino.fancy22.com');
    this.selectedResult.streamUrl = this.selectedResult.streamUrl.replace(
      '{$domain}',
      currentOrigin
    );
    // this.selectedResult.cards.url ='https://casino.fancy22.com/api/users/images/ballbyball-2024889380422.mp4'
    var element1 = document.getElementById(
      'videoballbyballResult'
    ) as HTMLVideoElement;

    if (element1) {
      element1.muted = true;
      // element1.play();
    }

    if (!element1?.muted) {
      const intervalId = setInterval(() => {
        const element = document.getElementById(
          'videoballbyballResult'
        ) as HTMLVideoElement;
        if (element) {
          element.muted = true;
          if (element.muted) {
            clearInterval(intervalId);
          }
        }
      }, 10);
    }
  }
}
