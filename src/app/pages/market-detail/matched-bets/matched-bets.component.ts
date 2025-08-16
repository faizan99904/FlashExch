import { CommonModule } from '@angular/common';
import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../../../service/shared.service';
import { VideoRealComponent } from '../video-real/video-real.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NetworkService } from '../../../service/network.service';

@Component({
  selector: 'app-matched-bets',
  imports: [CommonModule, VideoRealComponent],
  templateUrl: './matched-bets.component.html',
  styleUrl: './matched-bets.component.css',
})
export class MatchedBetsComponent implements OnInit, OnDestroy {
  unmatchedBets = false;
  matchedBets = false;
  isLiveStreaming = false;
  matchedData: any;
  isDesktop: boolean;
  userDetail: any;
  isStartStream = false;
  sportId: any;
  event_id: any;
  sportObj: any;
  previousSport: any;
  previousEventId!: string;
  streamShowValidation = true;
  clicked: boolean = false;
  isBetsSlipOpened: string = '';
  isValueBetsSlip: number = 0;
  subscription!: Subscription;
  activeRoute:any
  constructor(
    private route: ActivatedRoute,
    private shared: SharedService,
    private deviceService: DeviceDetectorService,
    private backendService: NetworkService,
    private router:Router
  ) {
    this.route.params.subscribe((params) => {
      this.sportId = params['sportId'];
      this.event_id = params['eventId'];
      this.sportObj = {
        event_id: this.event_id,
        sportId: this.sportId,
      };

      if (
        this.previousSport !== this.sportId ||
        this.previousEventId !== this.event_id
      ) {
        this.unsubscribeFirebase();
      }

      this.previousSport = this.sportId;
      this.previousEventId = this.event_id;
    });



    effect(() => {
      const data = this.shared.getMatchedBets()();
      this.matchedData = Array.isArray(data) ? data : [];
    });

    const routeUrl = this.router.url.split('/');
    const routeNameOne = routeUrl[1] || '/';
    this.activeRoute = routeNameOne;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlSegments = event.urlAfterRedirects.split('/');
        const routeName = urlSegments[1] || '/';
        this.activeRoute = routeName;
        const mainRouter = document.querySelector('.mainRouter') as HTMLElement;
        if (mainRouter) {
          mainRouter.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setTimeout(() => {
          this.activeRoute = routeName;
        }, 0);
      }
    });

    this.isDesktop = this.deviceService.isDesktop();
  }

  ngOnInit() {
    this.subscription = this.backendService
      .getBetPlace()
      .subscribe((data: any) => {
        if (data) {
          this.clicked = false;
          // this.loader = data.loader;

          if (data.profitlossCall == true && data.loader == false) {
            this.ProfitLossBalance();
            this.isBetsSlipOpened = '';
          }

          if (data.profitlossCall == false && data.loader == false) {
            this.isBetsSlipOpened = '';
            this.isValueBetsSlip = 0;
          }
        }
      });

    this.checkUserForStream();
  }

  ProfitLossBalance() {
    console.log('ProfitLossBalance called');
  }

  hasStream(data: any) {
    this.isStartStream = data;
  }

  checkUserForStream() {
    this.userDetail = JSON.parse(localStorage.getItem('userDetail') as string);
    this.streamShowValidation = this.userDetail?.userName !== 'diamonddemo';
  }

  ngOnDestroy() {
    this.unsubscribeFirebase();
    this.subscription.unsubscribe();
  }

  unsubscribeFirebase() {
    
  }
}
