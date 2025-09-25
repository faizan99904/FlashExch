import {
  DecimalPipe,
  NgClass,
  NgFor,
  NgIf,
} from '@angular/common';
import { Component, Inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoaderComponent } from '../loader/loader.component';
import { BetslipComponent } from '../betslip/betslip.component';
import { ShortNumberPipe } from '../pipes/short-number.pipe';
import { CONFIG } from '../../../../config';
import { NetworkService } from '../../service/network.service';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-lottery-details',
  standalone: true,
  templateUrl: './lottery-details.component.html',
  styleUrl: './lottery-details.component.css',
  imports: [
    LoaderComponent,
    NgFor,
    NgIf,
    NgClass,
    BetslipComponent,
    DecimalPipe,
  ],
})
export class LotteryDetailsComponent implements OnInit, OnDestroy {
  event_id: any;
  sportId: any;
  isHasProfitLoss: boolean = true;
  lotteryList: any = {};
  marketData: any = [];
  isLoaderShown: boolean = false;
  betplaceObj: any;
  marketId: any;
  type: any;
  betType: any;
  isBetsSlipOpened: any = '';
  rulesInfo: any;
  LotterySubscription: any;
  isBetsSlipPANAOpened: any = [];
  runnerPrice: any;
  index: any;
  isValueBetsSlip: any;
  subscription: any;
  lotteryPl: any = {};
  currentRunnerPrice: any;
  isMobile: any;
  token: any;
  rules: boolean = false;
  openRules: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject('firebaseProjectOther') private otherFirestore: AngularFirestore,
    private backendService: NetworkService,
    private deviceDetector: DeviceDetectorService,
    private toaster: ToastrService,
    private mainService: MainService
  ) {
    this.route.params.subscribe((params) => {
      this.sportId = params['sportId'];
      this.event_id = params['eventId'];
      // this.gameName = params['gameName'];
      this.getMarketList();

      this.isMobile = this.deviceDetector.isMobile();
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.LotterySubscription) {
      this.LotterySubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.getlotteryPL();
      this.getLotteryDataFirebase();
    }

    this.subscription = this.backendService
      .getBetPlace()
      .subscribe((data: any) => {
        if (data) {
          // this.clicked = false;
          // this.loader = data.loader;
          // this.isBetsSlipOpened = '';

          if (data.profitlossCall == true && data.loader == false) {
            if (this.token) {
              this.getlotteryPL();
            }

            this.isBetsSlipOpened = '';
            this.isBetsSlipPANAOpened = [];
          }

          if (data.profitlossCall == false && data.loader == false) {
            this.isBetsSlipOpened = '';
            this.isBetsSlipPANAOpened = [];

            this.isValueBetsSlip = 0;
          }
        }
      });
  }
  getlotteryPL() {
    var req = {
      eventId: this.event_id,
      sportId: this.sportId,
    };
    this.backendService
      .getAllRecordsByPost(CONFIG.getLotteryPl, req)
      .then((data: any) => {
        this.lotteryPl = data.pl;
        this.isHasProfitLoss = this.isEmptyObject(this.lotteryPl);
      })
      .catch((error: any) => {
        let responseData = error;
      });
  }
  getMarketList() {
    this.isLoaderShown = true;
    var req = {
      eventId: this.event_id,
      sportId: this.sportId,
      key: CONFIG.siteKey,
    };
    this.backendService
      .getAllRecordsByPost(CONFIG.getMarketsEventList, req)
      .then((record: any) => {
        this.isLoaderShown = false;
        this.lotteryList = record?.data?.lotteryData[0];
        if (record?.data?.lotteryData?.length == 0) {
          this.toaster.error('No Markets are active', 'Sorry');
          this.router.navigateByUrl('/');
        } else {
          this.marketData = record?.data?.lotteryData[0].marketsArr.sort(
            (a: any, b: any) => a.sequence - b.sequence
          );
        }
        this.marketData = this.marketData.filter((item: any) => {
          if (item.status == 'CLOSED') {
            return null;
          } else {
            return item;
          }
        });
        // console.log(this.lotteryList);
      })
      .catch((error: any) => {
        console.error('Error in getMarketsEventList request:', error);
      });
  }
  getLotteryDataFirebase() {
    this.LotterySubscription = this.otherFirestore
      .collection('Lottery', (ref: any) => {
        return ref
          .where('exEventId', '==', this.event_id)
          .where('isClosed', '==', 0);
      })
      .stateChanges()
      .subscribe((changes: any) => {
        changes.forEach((change: any) => {
          let pt: any = change.payload.doc.data();
          let currentid;

          if (change.type == 'removed') {
            // console.log('removed', pt);
            // dont know what to do here...
          } else {
            // console.log('data',pt);
            this.marketData = pt.marketsArr
              .filter((obj: any) => {
                return obj?.status != 'CLOSED';
              })
              .sort((a: any, b: any) => a.sequence - b.sequence);
          }
        });
      });
  }
  showToaster() {
    this.toaster.error('Thanks for the patience.', 'COMING SOON');
  }
  trackByFn(index: any, item: any) {
    return item.exMarketId;
  }
  getValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip.stake;
    this.currentRunnerPrice = isValueBetsSlip.price;
  }
  openBetslip(
    marketId: any,
    selectionId: any,
    betType: any,
    price: any,
    min: any,
    max: any,
    marketName: any
  ) {
    // if (price == 0) {
    //   this.isBetsSlipOpened = '';
    //   this.marketId = '';
    //   return
    // }
    // this.showToaster();
    // return

    this.isBetsSlipPANAOpened = [];
    this.isBetsSlipOpened = selectionId;
    this.marketId = marketId;

    this.timeoutFunctionforBetslip(marketId);
    //

    this.type = betType;
    this.isValueBetsSlip = 0;
    this.runnerPrice = price;

    this.betplaceObj = {
      marketId: marketId,
      selectionId: selectionId,
      betType: betType,
      price: price,
      eventId: this.event_id,
      minValue: min,
      maxValue: max,
      sportId: this.sportId,
      type: 'Lottery',
      oddsType: 'Lottery',
    };
    // console.log('bet slip obj', this.betplaceObj);
    this.mainService.setbetslip(this.betplaceObj)
  }




  timeoutFunctionforBetslip(marketId: any) {
    setTimeout(() => {
      const element = document.getElementById('betslip' + marketId);
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

    setTimeout(() => {
      const betslipElement = document.getElementById('betslip' + marketId);
      const isBetslipOpen =
        betslipElement && betslipElement.style.display !== 'none';

      if (!isBetslipOpen) {
        // If the betslip is not already open, set up the event listener
        this.callFunctionOnClickNearBottom(150, this.scrollToBetslip);
      } else {
        // console.log('Betslip is already open, no need to scroll');
      }
    }, 1);
  }
  openPANABetslip(
    marketId: any,
    selectionId: any,
    betType: any,
    price: any,
    min: any,
    max: any,
    marketName: any
  ) {
    // if (price == 0) {
    //   this.isBetsSlipOpened = '';
    //   this.marketId = '';
    //   return

    // }
    // this.showToaster();
    // return

    this.isBetsSlipOpened = '';
    if (marketId != this.marketId) {
      this.isBetsSlipPANAOpened = [];
    }
    this.marketId = marketId;

    if (this.isBetsSlipPANAOpened.length != 3) {
      this.isBetsSlipPANAOpened.push(selectionId);
    }
    // if (this.isBetsSlipPANAOpened.includes(selectionId)) {

    //   const index = this.isBetsSlipPANAOpened.indexOf(selectionId);
    //   this.isBetsSlipPANAOpened.splice(index, 1);
    // } else if(this.isBetsSlipPANAOpened.length<3){

    //   this.isBetsSlipPANAOpened.push(selectionId);
    // }

    if (this.isBetsSlipPANAOpened.length == 3) {
      // console.log(this.isBetsSlipPANAOpened)
      // this.isBetsSlipPANAOpened = selectionId;

      this.timeoutFunctionforBetslip(marketId);

      //
      debugger;
      let countZero = this.isBetsSlipPANAOpened.reduce(
        (count: any, value: any) => {
          return value == '0' ? count + 1 : count;
        },
        0
      );

      // Check if there are two or more occurrences of 0
      if (countZero == 2) {
        let nonZeroValue = this.isBetsSlipPANAOpened.find(
          (element: any) => element != '0'
        );
        // this.isBetsSlipPANAOpened.unshift(nonZeroValue);
        let index = this.isBetsSlipPANAOpened.indexOf(nonZeroValue);
        // If the element with value 0 is found, remove it and push it to the end
        if (index !== -1) {
          this.isBetsSlipPANAOpened.splice(index, 1); // Remove element at the found index
          this.isBetsSlipPANAOpened.unshift(nonZeroValue); // Push 0 to the end of the array
        }
      } else if (countZero == 1) {
        this.isBetsSlipPANAOpened.sort((a: any, b: any) => a - b);

        let index = this.isBetsSlipPANAOpened.indexOf('0');
        // If the element with value 0 is found, remove it and push it to the end
        if (index !== -1) {
          this.isBetsSlipPANAOpened.splice(index, 1); // Remove element at the found index
          this.isBetsSlipPANAOpened.push('0'); // Push 0 to the end of the array
        }
      }

      if (!this.isBetsSlipPANAOpened.includes('0')) {
        let index = this.isBetsSlipPANAOpened.indexOf('0');

        if (index !== -1) {
          this.isBetsSlipPANAOpened.splice(index, 1);
          this.isBetsSlipPANAOpened.push('0');
        }
        this.isBetsSlipPANAOpened.sort((a: any, b: any) => a - b);
      } else if (this.isBetsSlipPANAOpened[0] == '0') {
        let firstElement = this.isBetsSlipPANAOpened.shift();
        this.isBetsSlipPANAOpened.push(firstElement);
      }

      this.type = betType;
      this.isValueBetsSlip = 0;
      this.runnerPrice = price;

      this.betplaceObj = {
        marketId: marketId,
        selectionId: this.isBetsSlipPANAOpened.join(''),
        betType: betType,
        price: this.isBetsSlipPANAOpened.join(''),
        eventId: this.event_id,
        minValue: min,
        maxValue: max,
        sportId: this.sportId,
        type: 'Lottery',
        oddsType: 'Lottery',
      };
      // console.log('bet slip obj', this.betplaceObj)
    }
  }
  scrollToBetslip() {
    const element = document.getElementById('betslip' + this.marketId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'end',
      });
    }
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
  isEmptyObject(obj: any) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  runnerIsPresentInPANA(runner: any) {
    return this.isBetsSlipPANAOpened.includes(runner);
  }
  gameRules(sportId: any) {
    this.backendService
      .getAllRecordsByPost(CONFIG.getSportsRule, {
        sportId: sportId,
        key: CONFIG.siteKey,
      })
      .then((data: any) => {
        this.rulesInfo = data.data;
        // console.log(this.rulesInfo);
      })
      .catch((error) => {
        let responseData = error;
      });

    this.rules = true;
  }
}
