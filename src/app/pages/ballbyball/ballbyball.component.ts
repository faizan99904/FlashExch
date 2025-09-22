import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { CommonModule, NgFor } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { first, Subscription } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';

import { ResultsComponent } from './results/results.component';
import { VideoBallbyBallComponent } from './video-ballby-ball/video-ballby-ball.component';
import { ShortNumberPipe } from '../../shared/pipes/short-number.pipe';
import { BetslipComponent } from '../../shared/betslip/betslip.component';
import { MainService } from '../../service/main.service';
import { NetworkService } from '../../service/network.service';
import { CONFIG } from '../../../../config';
import { LoaderComponent } from "../../shared/loader/loader.component";


@Component({
  selector: 'app-ballbyball',

  standalone: true,
  
  imports: [
    CommonModule,
    BetslipComponent,
    ResultsComponent,
    VideoBallbyBallComponent,
    ShortNumberPipe,
    LoaderComponent
],
  templateUrl: './ballbyball.component.html',
  styleUrl: './ballbyball.component.css',
})
export class BallbyballComponent implements OnInit, OnDestroy {
  isTooltip: boolean = false
  subscription!: Subscription | undefined;
  subscription2!: Subscription | undefined;
  // @ViewChild(PlaceBetComponent) MatchedBetsComponent!: NewType;
  ballbyBallStream: any;
  showBanner: any = false;

  public message = {
    type: '1',
    id: '',
  };
  results: any;
  // public messageResult = {
  //   type: "3",
  //   id: ""
  // };

  eventid: any;

  getRoundId: any = '';
  runnersName: any = {};
  casinoPl: any = [];
  marketArray: any = [];
  isBetsSlipOpened = '';

  betplaceObj: any;
  totalMatchedBets: any;
  game: any = {};
  betSlip: string = 'game';
  _roomId;
  timer: any;
  winnerMarketArray: any;
  playerACards: any;
  playerBCards: any;
  gameroundId: any;
  isValueBetsSlip = 0;
  betType: any;
  marketId: any;
  selectedCell: any;
  split_arr: any;
  changeValue: unknown;
  RoundWinner: any;
  betSelectedPlayer: any;
  currentRunnerPrice: any;
  loader: any;
  isMobile: boolean;
  isDesktop: boolean;
  winningAmount: any;
  sportId: any;
  userCount: any;
  sportObj: any;
  event_id: any;
  isMobileInfo: string;
  ballbyBallSubscription: any;
  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    private mainService: MainService,
    private networkService: NetworkService,
    private deviceService: DeviceDetectorService,
    @Inject('firebaseProjectCricket') private cricketFirestore: AngularFirestore
  ) {
    this.isMobile = this.deviceService.isMobile();
    this.isDesktop = this.deviceService.isDesktop();
    this.isMobileInfo = this.deviceService.os;
    this._roomId = '';

    this.message.id = this.eventid;

    this.route.params.subscribe((params) => {
      this.sportId = params['sportId'];
      this.event_id = params['eventId'];

      // this.gameName = params['gameName'];
      this.sportObj = {
        event_id: this.event_id,
        sportId: this.sportId,
      };
    });
  }
  eventName: any;
  counter = 0;
  theme: any;
  resultcounter = 0;
  ngOnInit(): void {
    // For ProfitLoss Get Value For Desktop
    this.mainService.setEventId(this.event_id);
    this.getEventOdds();
    if (!this.isDesktop) {
      this.setMarketScrollHeight();
      $('html').css('overflow', 'hidden');
    }

    if (this.isDesktop) {
      // this.networkService.getStakeValue().subscribe((data: any) => {
      //   if (data) {
      //     this.isValueBetsSlip = data.stake;
      //     this.currentRunnerPrice = data.price;
      //   }
      // });
    }

    this.subscription2 = this.networkService
      .getBetPlace()
      .subscribe((data: any) => {
        if (data) {
          this.loader = data.loader;

          if (data.profitlossCall == true && data.loader == false) {
            this.getAllMarketProfitLoss();
            this.isBetsSlipOpened = '';
          }

          if (data.profitlossCall == false && data.loader == false) {
            this.isBetsSlipOpened = '';
            this.isValueBetsSlip = 0;
          }
        }
      });

    this.getResults();

    // let token = localStorage.getItem('token');
    // if (token) {
    //   this.getAllMarketProfitLoss();
    // }
  }
  unsubscribeFirebase() {
    if (this.ballbyBallSubscription) {
      this.ballbyBallSubscription.unsubscribe();
    }
  }
  getBallbyBallDataFirebase(projectDynamic?: any) {
    this.ballbyBallSubscription = projectDynamic
      .collection('Sportsbook', (ref: any) =>
        ref.where('exEventId', '==', this.event_id)
      )
      .stateChanges()
      .subscribe((changes: any) => {
        changes.forEach((change: any) => {
          const pt: any = change.payload.doc.data();
          const currentid = change.payload.doc.id;
          // console.log('pt', pt);
          if (change.type === 'added') {
            this.game = pt;
            this.networkService.setRoundData(pt);
            this.marketId = this.game.exMarketId;
            this.manageObj();
          }
          if (change.type == 'modified') {
            this.game = pt;
            this.marketId = this.game.exMarketId;
            this.networkService.setRoundData(pt);
            this.manageObj();
          }
          if (change.type == 'removed') {
          }
        });
      });
  }
  manageObj() {
    // console.log('exMarketId', this.game.exMarketId,);
    if (this.getRoundId != this.game.exMarketId || this.getRoundId == '') {
      this.getRoundId = this.game.exMarketId

      localStorage.setItem('roundID', this.game.exMarketId);
      this.getBalance();
      this.casinoPl = [];
      this.getResults();
      // this.MatchedBetsComponent?.casinoMatchedBetList();
      this.selectedCell = '';
      this.betSelectedPlayer = '';
    }
    if (this.game.oddsData?.status == 'SUSPENDED') {
      this.isBetsSlipOpened = '';
      this.selectedCell = '';

      if (this.isValueBetsSlip > 0 && this.isDesktop) {
        this.betplaceObj.status = this.game.status;
      }
      this.isValueBetsSlip = 0;
    }
  }
  ProfitLossBalance() {
    this.getAllMarketProfitLoss();
    this.getBalance();
  }
  setMarketScrollHeight() {
    const marketScrollElement = document.getElementById('marketScroll');
    const windowHeight = window.innerHeight;
    // Adjust the percentage or calculation based on your specific needs.

    if (this.isMobile) {
      // document.body.style.overflowY = 'hidden';
    }
    let targetHeight;
    if (this.isMobileInfo == 'iOS') {
      //  targetHeight = Math.floor(windowHeight * 0.52); //done
      targetHeight = Math.floor(windowHeight * 0.62);
    } else {
      targetHeight = Math.floor(windowHeight * 0.63);
    }

    if (marketScrollElement) {
      marketScrollElement.style.height = `${targetHeight}px`;
      // marketScrollElement.style.marginTop = `${margintop}px`;
    }
  }

  absValue(x: any) {
    return Math.abs(x);
  }

  getEventOdds() {
    this.getRoundId = localStorage.getItem('roundID');
    this.loader = true;
    var req = {
      eventId: this.event_id,
      sportId: this.sportId,
      key: CONFIG.siteKey,
    };
    this.networkService
      .getAllRecordsByPost(CONFIG.getBallByBallMarket, req)
      .then(
        (res: any) => {
          this.loader = false;
          if (res.meta.status_code == 200) {
            this.game = res?.data;
            this.getRoundId = this.game.exMarketId;
            this.marketId = this.game.marketId;
            this.networkService.setRoundData(this.game);
            let token = localStorage.getItem('token');
            if (token) {
              this.getBallbyBallDataFirebase(this.cricketFirestore);
              this.getAllMarketProfitLoss();
            }
          } else {
            this.loader = false;
            this.toaster.error(res.meta.message, '', {
              positionClass: 'toast-top-right',
            });
          }
        },
        (erorr) => {
          this.loader = false;
        }
      );
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  ngAfterViewInit() {}
  sendMsg() {
    // setTimeout(() => {
    //   this.casinoService.resultMsg.next(this.messageResult);
    // }, 1000);
    // this.casinoService.send(this.message);
    // this.casinoService.messages.next(this.message);
  }
  getMatchedBets(value: any) {
    this.totalMatchedBets = value;
  }

  getMatchedBetsActive(value: any) {
    this.betSlip = value;
  }

  openBetslip(
    marketId: any,
    selectionId: any,
    betType: any,
    price: any,
    min: any,
    max: any,
    status: any,
    marketName?: any,
    oddsType?: any,
    marketStatus?: any,
    index?: any
  ) {
    // if (!localStorage.getItem('allowBallByBall')) {
    //   this.toaster.info('Coming Soon!', '', {});
    //   return;
    // }

    if (status == 'SUSPENDED' || marketStatus == 'SUSPENDED') {
      return;
    }

    this.isBetsSlipOpened = selectionId;
    this.marketId = marketId;
    this.betType = betType;
    this.isValueBetsSlip = 0;
    this.selectedCell = selectionId;
    this.betplaceObj = {
      marketId: marketId,
      selectionId: selectionId,
      betType: betType,
      price: price,
      eventId: this.event_id,
      roomId: this._roomId,
      minValue: min,
      maxValue: max,
      marketName: marketName,
      bg: 'sportsbook',
      oddsType: oddsType,
      sportId: this.sportId,
      index: index,
      type:'Ballbyball'
    };

      this.mainService.setbetslip(this.betplaceObj)



    setTimeout(() => {
      const element = document.getElementById('betslip');
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isVisible) {
          // console.log('Betslip is completely in the viewport');
        } else {
          // console.log('Betslip is not completely in the viewport');
          this.scrollToBetslip();
        }
      }
    }, 50);
    // setTimeout(() => {
    //   this.centerScrollableDiv('betslip');

    // }, 100);

    setTimeout(() => {
      const betslipElement = document.getElementById('betslip');
      const isBetslipOpen =
        betslipElement && betslipElement.style.display !== 'none';

      if (!isBetslipOpen) {
        // If the betslip is not already open, set up the event listener
        this.callFunctionOnClickNearBottom(0, this.scrollToBetslip);
        // this.centerScrollableDiv('betslip')
      } else {
        // console.log('Betslip is already open, no need to scroll');
      }
    }, 1);


  }

  callFunctionOnClickNearBottom(
    thresholdFromBottom: number,
    callback: () => void
  ) {
    window.addEventListener('click', (event) => {
      const viewportHeight = window.innerHeight;
      const clickY = event.clientY;

      if (viewportHeight - clickY <= thresholdFromBottom) {
        callback();
      }
    });
  }

  scrollToBetslip() {
    const element = document.getElementById('betslip');
    if (element) {
      // element.scrollIntoView({
      //   behavior: "smooth",
      //   block: "center",
      //   inline: "end"
      // });
      this.centerScrollableDiv('betslip');
    }
  }

  centerScrollableDiv(betslip: any) {
    const centeredDiv = document.getElementById(betslip);
    const container = document.getElementById('marketScroll');

    if (centeredDiv && container) {
      const containerRect = container.getBoundingClientRect();
      const centeredDivRect = centeredDiv.getBoundingClientRect();

      // Calculate the center position of the centeredDiv vertically within the container
      // const centerY = centeredDivRect.top - containerRect.top + centeredDivRect.height / 2;
      const centerY = centeredDiv.offsetTop + centeredDiv.offsetHeight / 2;

      // Adjust the scrollTop property to center the div vertically
      // const scrollTopValue = Math.max(centerY - containerRect.height / 2, 0);
      const scrollTopValue = centerY - container.offsetHeight / 2;

      // Set the scrollTop value
      container.scrollTop = scrollTopValue;
    }
  }

  ChangeValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip;
  }
  getAllMarketProfitLoss() {
    this.selectedCell = '';
    this.isValueBetsSlip = 0;
    this.networkService
      .getAllRecordsByPostOld(CONFIG.getSportsbookPl, {
        eventId: this.event_id,
        marketId:this.game.exMarketId
      })
      .subscribe((res: any) => {
        // Extract the main key dynamically
        // const mainKey = Object.keys(res.pl)[0];

        // Now you can access the object using this key
        const mainObject = res.pl[this.game.exMarketId];
        let obj = {
          [this.game?.exMarketId]:mainObject
        }
        this.casinoPl = obj
        // console.log('this',this.casinoPl)
      });
    // this.MatchedBetsComponent?.casinoMatchedBetList();
  }

  getBalance() {
    this.networkService.getAllRecordsByPost(CONFIG.userBalance, {}).then(
      (data: any) => {
        if (data.meta.status == true) {
          let availBalance = (
            data.data.bankBalance - data.data.exposure
          ).toFixed(2);
          $('.userTotalBalance').text(availBalance);
          $('.userTotalExposure').text(data.data.exposure);
        }
      },
      (error) => {
        let responseData = error;
      }
    );
  }
  getResults() {
    this.networkService
      .getAllRecordsByPost(CONFIG.getMarketEventResults, {
        eventId: this.event_id,
        timeStamp: this.marketId
      })
      .then(
        (data: any) => {
          this.results = data.data;
          // this.networkService.updateResultstream(data.data);
        },
        (error) => {
          let responseData = error;
        }
      );
  }

  ngOnDestroy(): void {
    $('html').css('overflow', 'auto');
    this.unsubscribeFirebase();
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }

  getValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip;
    this.currentRunnerPrice = isValueBetsSlip.price;
  }
}
