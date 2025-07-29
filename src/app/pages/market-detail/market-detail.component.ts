import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { first, Subscription } from 'rxjs';
import * as _ from 'lodash';

import { ToastrService } from 'ngx-toastr';

import { CommonModule, Location } from '@angular/common';
import { BetslipComponent } from '../../shared/betslip/betslip.component';
import { NetworkService } from '../../service/network.service';
import { MainService } from '../../service/main.service';
import { CONFIG } from '../../../../config';

declare var $: any;

@Component({
  selector: 'app-market-detail',
  imports: [BetslipComponent, CommonModule],
  templateUrl: './market-detail.component.html',
  styleUrl: './market-detail.component.css',
})
export class MarketDetailComponent {
  opendInfoId: any = [];
  loader: boolean = true;
  selectedType = 'ODD';
  isStartStream = false;
  isScoreCard = true;
  isScore: any;
  isOPenCard = false;
  sportId: any;
  previousSport: any;
  selectedMarket: any = 'All';
  selectedFancyMarket = 'Popular';
  MarketData: any = [];
  matchOddsData: any = [];
  event_id = '';
  gameName: any;
  runnerPrice: any;
  matchOddsDataUpdated: any;
  bookmakersData: any = [];
  AllMarketList: any = [];
  marketId: any;
  betType: any;
  isValueBetsSlip: any;
  eventid: any;
  isBetsSlipOpened: any = '';
  betplaceObj: any;
  isMobile: any;
  isDesktop: any;
  matchedBetList: any = [];
  matchedOddsPl: any = [];
  FancyPl: any = [];
  SportsbookPl: any = [];
  BookmakersPl: any = [];
  AllFancyMarkets: any = [];
  AllFancyMarketsFiltered: any = [];
  AllFancyMarketsSort: any = [];
  isMuted: boolean = true;
  marketlistFancy: any = [];
  cashoutValue: any = [];
  sportbookSubscription: any;
  fancySubscription: any;
  bookmakerSubscription: any;
  rulesInfo: any;
  fancyBook: any;
  cashOutAPIData: any;
  sportObj: any;
  public intrvlCashOut: number | undefined;
  type: any;
  index: any;
  token: any = '';
  previousEventId: string | undefined;
  subscription: Subscription | undefined;
  clicked: boolean = false;
  streamShowValidation: boolean = true;
  userBalance: any;
  userDetail: any;
  isMobileInfo: string;
  onOpenPage: any;
  onOpenPageSportbook: any;
  firebaseResposeBookmaker: any = [];
  firebaseResposesportBook: any = [];
  selectedColor: string = '';
  fancyMarket: boolean = true;
  competitionName: any;
  openBets: boolean = false;
  unmatchedBets: boolean = false;
  matchedBets: boolean = false;
  rules: boolean = false;
  openRules: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendService: NetworkService,
    private deviceService: DeviceDetectorService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Inject('firebaseProjectCricket')
    private cricketFirestore: AngularFirestore,
    @Inject('firebaseProjectTennis') private tennisFirestore: AngularFirestore,
    @Inject('firebaseProjectOther') private otherFirestore: AngularFirestore,
    @Inject('firebaseProjectSoccer') private soccerFirestore: AngularFirestore,
    private location: Location,
    private mainService: MainService,
    private toaster: ToastrService
  ) {
    this.onOpenPage = true;
    this.onOpenPageSportbook = true;
    this.route.params.subscribe((params) => {
      this.sportId = params['sportId'];
      this.event_id = params['eventId'];
      // this.gameName = params['gameName'];
      this.sportObj = {
        event_id: this.event_id,
        sportId: this.sportId,
      };
      if (
        this.previousSport != this.sportId ||
        this.previousEventId != this.event_id ||
        !params['gameId'] ||
        params['gameId'] != undefined
      ) {
        this.unsubscribeFirebase();
      }
      this.previousSport = this.sportId;
      this.previousEventId = this.event_id;
      this.getMarketList();

      // this.InitialStartupApiCalls();
    });
    this.isMobile = this.deviceService.isMobile();
    this.isDesktop = this.deviceService.isDesktop();
    this.isMobileInfo = this.deviceService.os;
  }

  toggleBets() {
    this.openBets = !this.openBets;
  }

  ngOnInit(): void {
    this.competitionName = localStorage.getItem('competitionName');
    this.getfancyMarketList();
    setTimeout(() => {
      this.checkUserForStream();
    }, 1);
    this.token = localStorage.getItem('token') as string;
    localStorage.setItem('lastActiveSport', this.sportId);
    this.subscription = this.backendService
      .getBetPlace()
      .subscribe((data: any) => {
        if (data) {
          this.clicked = false;
          this.loader = data.loader;

          if (data.profitlossCall == true && data.loader == false) {
            this.ProfitLossBalance();
            this.isBetsSlipOpened = '';
            this.marketId = '';
          }

          if (data.profitlossCall == false && data.loader == false) {
            this.isBetsSlipOpened = '';
            this.isValueBetsSlip = 0;
            this.marketId = '';
          }
        }
      });
  }
  ngAfterViewInit(): void {}
  ngOnDestroy() {
    this.unsubscribeFirebase();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  unsubscribeFirebase() {
    if (this.betfairSubscription) {
      this.betfairSubscription.unsubscribe();
    }
    if (this.bookmakerSubscription) {
      this.bookmakerSubscription.unsubscribe();
    }
    if (this.fancySubscription) {
      this.fancySubscription.unsubscribe();
    }
    if (this.sportbookSubscription) {
      this.sportbookSubscription.unsubscribe();
    }
    window.clearInterval(this.intrvlCashOut);
  }
  getfancyMarketList() {
    this.mainService
      .getDataFromServices(CONFIG.fancyMarketList, CONFIG.fancyMarketListTime, {
        key: CONFIG.siteKey,
      })
      .subscribe((data: any) => {
        this.marketlistFancy = data.data.fancy;
      });
  }

  betfairSubscription: any;

  getMarketList() {
    // getMarketList
    var req = {
      eventId: this.event_id,
      sportId: this.sportId,
      key: CONFIG.siteKey,
    };
    this.backendService
      .getAllRecordsByPost(CONFIG.getMarketsEventList, req)
      .then(
        (record: any) => {
          this.MarketData = record.data;

          this.isScore = this.MarketData?.isScore;

          this.isOPenCard = this.isScore;
          this.loader = false;
          this.matchOddsData = this.MarketData.matchOddsData;
          if (this.sportId == 1) {
            this.matchOddsData = this.matchOddsData.sort(
              this.customSortByMarketType
            );
          }
          this.AllMarketList = [
            ...this.matchOddsData,
            ...this.MarketData.bookmakersData,
          ];
          this.AllFancyMarkets = [
            ...this.MarketData.fancyData,
            ...this.MarketData.binaryData,
            ...this.MarketData.sportsbookData,
          ];

          this.bookmakersData = this.MarketData.bookmakersData;
          this.AllMarketList.sort((a: any, b: any) => a.sequence - b.sequence);
          let runFirebaseCall = false;
          if (
            this.AllFancyMarkets.length == 0 &&
            this.AllMarketList.length == 0
          ) {
            this.toaster.error('No Markets are active', 'Sorry');
            if (this.sportId == '7' || this.sportId == '4339') {
              this.mainService
                .getDataFromServices(CONFIG.racingEventsList, -1, {
                  key: CONFIG.siteKey,
                })
                .subscribe((data: any) => {});
            } else {
              this.mainService
                .getDataFromServices(CONFIG.getAllEventsList, -1, {
                  key: CONFIG.siteKey,
                })
                .subscribe((data: any) => {});
            }
            this.router.navigateByUrl('/');
            runFirebaseCall = false;
          } else {
            this.InitialStartupApiCalls();
            runFirebaseCall = true;
          }

          this.changeOddsMarket('All', '');
          this.changeFancyMarket('popular', false);
          let token = localStorage.getItem('token');
          if (token && runFirebaseCall) {
            if (this.sportId == '4') {
              this.getBetfairDataFirebase(this.cricketFirestore);
              this.getBookmakerDataFirebase(this.cricketFirestore);
              this.getFancyDataFirebase(this.cricketFirestore);
              this.getSportbookDataFirebase(this.cricketFirestore);
            } else if (this.sportId == '2') {
              this.getBetfairDataFirebase(this.tennisFirestore);
              this.getBookmakerDataFirebase(this.tennisFirestore);
              this.getFancyDataFirebase(this.tennisFirestore);
              this.getSportbookDataFirebase(this.tennisFirestore);
            } else if (this.sportId == '1') {
              this.getBetfairDataFirebase(this.soccerFirestore);
              this.getBookmakerDataFirebase(this.soccerFirestore);
              this.getFancyDataFirebase(this.soccerFirestore);
              this.getSportbookDataFirebase(this.soccerFirestore);
            } else {
              this.getBetfairDataFirebase(this.otherFirestore);
              this.getBookmakerDataFirebase(this.otherFirestore);
              this.getFancyDataFirebase(this.otherFirestore);
              this.getSportbookDataFirebase(this.otherFirestore);
            }
          }
        },
        (error: any) => {
          this.loader = false;
        }
      );
  }

  getBetfairDataFirebase(projectDynamic?: any) {
    let arry: any[] = [];

    this.betfairSubscription = projectDynamic
      .collection('Betfair', (ref: any) =>
        ref.where('exEventId', '==', this.event_id)
      )
      .stateChanges()
      .subscribe((changes: any) => {
        changes.forEach((change: any) => {
          const pt: any = change.payload.doc.data();
          const currentid = change.payload.doc.id;
          if (change.type === 'added') {
            const index = this.AllMarketList.findIndex(
              (obj: any) => obj.exMarketId === pt.exMarketId
            );

            if (index !== -1) {
              this.AllMarketList[index].oddsData.status = pt.oddsData.status;
              this.AllMarketList[index].oddsData.inPlay = pt.oddsData.inPlay;
              this.AllMarketList[index].oddsData.totalMatched =
                pt.oddsData.totalMatched;
              this.AllMarketList[index].min = pt.min;
              this.AllMarketList[index].max = pt.max;
              this.AllMarketList[index].news = pt.news;
              this.AllMarketList[index].oddsData.runners = pt.oddsData.runners;
              if (
                this.marketId == pt.exMarketId &&
                pt?.oddsData?.status !== 'ONLINE' &&
                pt?.oddsData?.status !== 'OPEN'
              ) {
                this.isBetsSlipOpened = '';
                this.isValueBetsSlip = 0;
              }
            } else {
              this.AllMarketList.push(pt);
              this.changeOddsMarket(this.selectedMarket, '');
            }
          }
          if (change.type == 'modified') {
            this.AllMarketList = this.AllMarketList.filter((data: any) => {
              if (data.exMarketId == pt.exMarketId) {
                data.oddsData.status = pt.oddsData.status;
                data.oddsData.inPlay = pt.oddsData.inPlay;
                data.oddsData.totalMatched = pt.oddsData.totalMatched;
                data.min = pt.min;
                data.max = pt.max;
                data.news = pt.news;
                data.oddsData.runners = pt.oddsData.runners;
                if (
                  this.marketId == pt.exMarketId &&
                  pt?.oddsData?.status !== 'ONLINE' &&
                  pt?.oddsData?.status !== 'OPEN'
                ) {
                  this.isBetsSlipOpened = '';
                  this.isValueBetsSlip = 0;
                }
              }
              return data;
            });
          }
          if (change.type == 'removed') {
            this.AllMarketList = this.AllMarketList.filter(
              (fancyMarket: any) => fancyMarket.exMarketId !== pt.exMarketId
            );
            this.changeOddsMarket(this.selectedMarket, '');
          }
        });
      });
  }
  getBookmakerDataFirebase(projectDynamic: any) {
    let arry: any[] = [];

    this.bookmakerSubscription = projectDynamic
      .collection('Bookmakers', (ref: any) => {
        return ref.where('exEventId', '==', this.event_id);
      })
      .stateChanges()
      .subscribe((changes: any) => {
        changes.forEach((change: any) => {
          let pt: any = change.payload.doc.data();
          let currentid;
          if (change.type === 'added') {
            const index = this.AllMarketList.findIndex(
              (obj: any) => obj.exMarketId === pt.exMarketId
            );

            if (index !== -1) {
              this.AllMarketList[index].oddsData.status = pt.oddsData.status;
              this.AllMarketList[index].oddsData.inPlay = pt.oddsData.inPlay;
              this.AllMarketList[index].oddsData.totalMatched =
                pt.oddsData.totalMatched;
              this.AllMarketList[index].min = pt.min;
              this.AllMarketList[index].max = pt.max;
              this.AllMarketList[index].news = pt.news;
              this.AllMarketList[index].oddsData.runners = pt.oddsData.runners;
              if (
                this.marketId == pt.exMarketId &&
                pt?.oddsData?.status !== 'ONLINE' &&
                pt?.oddsData?.status !== 'OPEN'
              ) {
                this.isBetsSlipOpened = '';
                this.isValueBetsSlip = 0;
              }
              this.changeOddsMarket(this.selectedMarket, '');
            } else {
              this.AllMarketList.push(pt);
              this.changeOddsMarket(this.selectedMarket, '');
            }
          }
          if (change.type == 'modified') {
            this.AllMarketList = this.AllMarketList.filter((data: any) => {
              if (data.exMarketId == pt.exMarketId) {
                data.oddsData.status = pt.oddsData.status;
                data.oddsData.inPlay = pt.oddsData.inPlay;
                data.oddsData.totalMatched = pt.oddsData.totalMatched;
                data.min = pt.min;
                data.max = pt.max;
                data.oddsData.runners = pt.oddsData.runners;
                data.news = pt.news;
                if (
                  this.marketId == pt.exMarketId &&
                  pt?.oddsData?.status !== 'ONLINE' &&
                  pt?.oddsData?.status !== 'OPEN'
                ) {
                  this.isBetsSlipOpened = '';
                  this.isValueBetsSlip = 0;
                }
              }
              return data;
            });
            // this.changeOddsMarket(this.selectedMarket, '');
          }
          if (change.type == 'removed') {
            this.AllMarketList = this.AllMarketList.filter(
              (fancyMarket: any) => fancyMarket.exMarketId !== pt.exMarketId
            );
            this.changeOddsMarket(this.selectedMarket, '');
          }
          // THIS CODE IS USE FOR IF API GIVES DATA MORE THAN FIREBASE RESPONSES FOR FIRST TIME ONLY
          // WE USE ONLY FIREBASE RESPONSE HERE
          if (this.onOpenPage) {
            this.firebaseResposeBookmaker.push(pt);
            setTimeout(() => {
              // Use a Set for faster lookup
              const exMarketIds = new Set(
                this.firebaseResposeBookmaker.map(
                  (item: any) => item.exMarketId
                )
              );
              this.AllMarketList = this.AllMarketList.filter(
                (bookmakerMarket: any) =>
                  bookmakerMarket.oddsType === 'MATCH_ODDS' ||
                  (bookmakerMarket.oddsType === 'BOOKMAKERS' &&
                    exMarketIds.has(bookmakerMarket.exMarketId))
              ).sort((a: any, b: any) => a.sequence - b.sequence);
              this.changeOddsMarket('All', '', null);
              this.onOpenPage = false;
            }, 2000);
          }
        });
      });
  }

  getFancyDataFirebase(projectDynamic: any) {
    let count = 1;
    this.fancySubscription = projectDynamic
      .collection('Fancy', (ref: any) => {
        return ref
          .where('exEventId', '==', this.event_id)
          .where('isClosed', '==', 0)
          .orderBy('sequence', 'asc');
      })
      .stateChanges()
      .subscribe((changes: any) => {
        changes.forEach((change: any) => {
          let pt: any = change.payload.doc.data();
          let currentid;
          if (change.type === 'added') {
            if (count == 1) {
              this.AllFancyMarkets.forEach((data: any) => {
                if (data.oddsType == 'FANCY') {
                  data.oddsData.status = 'CLOSED';
                }
              });
              count++;
            }

            let index = this.AllFancyMarkets.findIndex(
              (obj: any) => obj.exMarketId === pt.exMarketId
            );
            if (index !== -1) {
              this.AllFancyMarkets[index].oddsData.status = pt.oddsData.status;
              this.AllFancyMarkets[index].oddsData.inPlay = pt.oddsData.inPlay;
              this.AllFancyMarkets[index].oddsData.totalMatched =
                pt.oddsData.totalMatched;
              this.AllFancyMarkets[index].min = pt.min;
              this.AllFancyMarkets[index].max = pt.max;
              this.AllFancyMarkets[index].news = pt.news;
              this.AllFancyMarkets[index].oddsData = pt.oddsData;
              if (
                this.marketId == pt.exMarketId &&
                pt?.oddsData?.status !== 'ONLINE' &&
                pt?.oddsData?.status !== 'OPEN'
              ) {
                this.isBetsSlipOpened = '';
                this.isValueBetsSlip = 0;
              }
              this.changeFancyMarket(this.selectedFancyMarket, true);
            } else {
              this.AllFancyMarkets.push(pt);
              this.changeFancyMarket(this.selectedFancyMarket, true);
            }
          }
          if (change.type == 'modified') {
            this.AllFancyMarkets = this.AllFancyMarkets.filter((data: any) => {
              if (data.exMarketId == pt.exMarketId) {
                data.oddsData.status = pt.oddsData.status;
                data.oddsData.inPlay = pt.oddsData.inPlay;
                data.oddsData.totalMatched = pt.oddsData.totalMatched;
                data.min = pt.min;
                data.max = pt.max;
                data.news = pt.news;
                data.oddsData = pt.oddsData;
                if (
                  this.marketId == pt.exMarketId &&
                  pt?.oddsData?.status !== 'ONLINE' &&
                  pt?.oddsData?.status !== 'OPEN'
                ) {
                  this.isBetsSlipOpened = '';
                  this.isValueBetsSlip = 0;
                }
              }
              return data;
            });
          }
          if (change.type == 'removed') {
            this.AllFancyMarkets = this.AllFancyMarkets.filter(
              (fancyMarket: any) => fancyMarket.exMarketId !== pt.exMarketId
            );
            this.changeFancyMarket(this.selectedFancyMarket, true);
          }
        });
      });
  }

  getSportbookDataFirebase(projectDynamic: any) {
    this.sportbookSubscription = projectDynamic
      .collection('Sportsbook', (ref: any) => {
        return ref
          .where('exEventId', '==', this.event_id)
          .where('isClosed', '==', 0);
      })
      .stateChanges()
      .subscribe((changes: any) => {
        changes.forEach((change: any) => {
          let pt: any = change.payload.doc.data();
          let currentid;
          if (change.type === 'added') {
            const index = this.AllFancyMarkets.findIndex(
              (obj: any) => obj.exMarketId === pt.exMarketId
            );

            if (index !== -1) {
              this.AllFancyMarkets[index].oddsData.status = pt.oddsData.status;
              this.AllFancyMarkets[index].oddsData.inPlay = pt.oddsData.inPlay;
              this.AllFancyMarkets[index].oddsData.totalMatched =
                pt.oddsData.totalMatched;
              this.AllFancyMarkets[index].min = pt.min;
              this.AllFancyMarkets[index].max = pt.max;
              this.AllFancyMarkets[index].news = pt.news;
              this.AllFancyMarkets[index].tableFlag = pt.oddsType;
              this.AllFancyMarkets[index].oddsData = pt.oddsData;
              if (
                this.marketId == pt.exMarketId &&
                pt?.oddsData?.status !== 'ONLINE' &&
                pt?.oddsData?.status !== 'OPEN'
              ) {
                this.isBetsSlipOpened = '';
                this.marketId = '';
                this.isValueBetsSlip = 0;
              }
              this.changeFancyMarket(this.selectedFancyMarket, true);
            } else {
              pt.tableFlag = pt.oddsType;
              this.AllFancyMarkets.push(pt);
              this.changeFancyMarket(this.selectedFancyMarket, true);
            }
            //  console.log('added'+this.AllFancyMarkets[index].oddsData.status )
            //  console.log('added========================' )
            //  console.log('added'+ this.AllFancyMarkets[index] )
          }
          if (change.type == 'modified') {
            this.AllFancyMarkets = this.AllFancyMarkets.filter((data: any) => {
              if (data.exMarketId == pt.exMarketId) {
                data.oddsData.status = pt.oddsData.status;
                data.oddsData.inPlay = pt.oddsData.inPlay;
                data.oddsData.totalMatched = pt.oddsData.totalMatched;
                data.min = pt.min;
                data.max = pt.max;
                data.news = pt.news;
                data.tableFlag = pt.oddsType;
                data.oddsData = pt.oddsData;
                data.popular = pt.popular;

                if (
                  this.marketId == pt.exMarketId &&
                  pt?.oddsData?.status !== 'ONLINE' &&
                  pt?.oddsData?.status !== 'OPEN'
                ) {
                  this.isBetsSlipOpened = '';
                  this.marketId = '';
                  this.isValueBetsSlip = 0;
                }
                // console.log('modify'+ data.oddsData.status )
                // console.log('modify========================' )
                // console.log('modify'+ pt )
              }
              return data;
            });
          }
          if (change.type == 'removed') {
            this.AllFancyMarkets = this.AllFancyMarkets.filter(
              (fancyMarket: any) => fancyMarket.exMarketId !== pt.exMarketId
            );
            this.changeFancyMarket(this.selectedFancyMarket, true);
          }
          // THIS CODE IS USE FOR IF API GIVES DATA MORE THAN FIREBASE RESPONSES FOR FIRST TIME ONLY
          // WE USE ONLY FIREBASE RESPONSE HERE
          if (this.onOpenPageSportbook) {
            this.firebaseResposesportBook.push(pt);
            setTimeout(() => {
              // Use a Set for faster lookup
              const exMarketIds = new Set(
                this.firebaseResposesportBook.map(
                  (item: any) => item.exMarketId
                )
              );
              this.AllFancyMarkets = this.AllFancyMarkets.filter(
                (sportbookMarket: any) =>
                  sportbookMarket.oddsType === 'FANCY' ||
                  (sportbookMarket.oddsType === 'SPORTSBOOK' &&
                    exMarketIds.has(sportbookMarket.exMarketId))
              ).sort((a: any, b: any) => a.sequence - b.sequence);

              this.onOpenPageSportbook = false;
            }, 2000);
          }
        });
      });
  }
  customSortByMarketType = (a: any, b: any) => {
    const marketTypeA = a.createdAt.toUpperCase();
    const marketTypeB = b.createdAt.toUpperCase();

    if (marketTypeA < marketTypeB) {
      return -1;
    }
    if (marketTypeA > marketTypeB) {
      return 1;
    }
    return 0;
  };
  callFunctionOnClickNearBottom(
    thresholdFromBottom: number,
    callback: () => void
  ) {
    window.addEventListener('click', (event) => {
      if (!this.clicked) {
        const viewportHeight = window.innerHeight;
        const clickY = event.clientY;

        if (viewportHeight - clickY <= thresholdFromBottom) {
          this.clicked = true;
          callback();
        }
      }
    });

    window.addEventListener('touchend', (event) => {
      if (!this.clicked && event && event.touches && event.touches.length > 0) {
        const viewportHeight = window.innerHeight;
        const touchY = event.touches[0].clientY;

        if (viewportHeight - touchY <= thresholdFromBottom) {
          this.clicked = true;
          callback();
        }
      }
    });
  }

  scrollToBetslip() {
    const element = document.getElementById('betslip');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }

  checkUserForStream() {
    this.userDetail = JSON.parse(localStorage.getItem('userDetail') as string);
    if (this.userDetail?.userName == 'diamonddemo') {
      this.streamShowValidation = false;
    } else {
      this.streamShowValidation = true;
    }
  }

  checkLoggin() {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
      return;
    }
    this.userDetail = JSON.parse(localStorage.getItem('userDetail') as string);
    if (this.userDetail?.userName == 'diamonddemo') {
      this.toaster.error(
        'Sorry for inconvenience Use real ID to watch streaming.',
        '',
        {
          positionClass: 'toast-top-right',
        }
      );
      return;
    }
  }

  openBetslip(
    marketId: any,
    selectionId: any,
    betType: any,
    price: any,
    min: any,
    max: any,
    marketType: any,
    eventName?: any,
    size?: any,
    index?: any,
    mType?: any,
    isSuperFancy?: any
  ) {
    if (price == 0 || price == null || price == undefined || isNaN(price)) {
      this.isBetsSlipOpened = '';
      this.marketId = '';
      return;
    }
    window.clearInterval(this.intrvlCashOut);
    this.cashoutValue = [];

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
    this.callFunctionOnClickNearBottom(190, this.scrollToBetslip);
    if (this.sportId == '7' || this.sportId == '4339') {
      marketType = mType;
    }
    if (mType == 'MATCH_ODDS') {
      marketType = mType;
    }
    //
    this.isBetsSlipOpened = selectionId;
    this.marketId = marketId;
    this.type = betType;
    this.betType = marketType;
    this.isValueBetsSlip = 0;
    this.runnerPrice = price;
    this.index = index;
    this.betplaceObj = {
      marketId: marketId,
      selectionId: selectionId,
      betType: betType,
      price: price,
      eventId: this.eventid,
      eventName: eventName,
      minValue: min,
      maxValue: max,
      sportId: this.sportId,
      type: marketType,
      size: size,
      index: index,
      marketTpe: mType,
      isSuperFancy: isSuperFancy,
    };
  }
  getLocalDateTime(date: Date) {
    var res = new Date(date);
    // return moment(res, "YYYY MM DD hh:mm").format('YYYY-MM-DD hh:mm a');
  }
  currentRunnerPrice: any;
  getValueBetSlip(isValueBetsSlip: any) {
    this.isValueBetsSlip = isValueBetsSlip.stake;
    this.currentRunnerPrice = isValueBetsSlip.price;
  }

  InitialStartupApiCalls() {
    let token = localStorage.getItem('token') as string;
    if (token) {
      this.isValueBetsSlip = 0;
      this.getMatchedBetList();

      var req = {
        eventId: this.event_id,
        sportId: this.sportId,
      };
      this.getMatchedOddsPl(req);
      this.getBookMakerPl(req);
      if (
        this.sportId !== '2' &&
        this.sportId !== '1' &&
        this.sportId !== '4339' &&
        this.sportId !== '7'
      ) {
        this.getFancyPl(req);
        this.getSportBookPl(req);
      }
    }
  }
  ProfitLossBalance() {
    let token = localStorage.getItem('token');
    if (token) {
      this.isValueBetsSlip = 0;
      this.getMatchedBetList();

      var req = {
        eventId: this.event_id,
        sportId: this.sportId,
      };

      if (this.betType == 'MATCH_ODDS') {
        this.getMatchedOddsPl(req);
      }

      if (this.betType == 'FANCY') {
        this.getFancyPl(req);
      }

      if (this.betType == 'BOOKMAKERS') {
        this.getBookMakerPl(req);
      }

      if (this.betType == 'SPORTSBOOK') {
        this.getSportBookPl(req);
      }
    }
  }

  getMatchedBetList() {
    let req = {
      eventId: this.event_id,
      sportId: this.sportId,
    };
    this.backendService
      .getAllRecordsByPost(CONFIG.eventMatchedBetList, req)
      .then(
        (record: any) => {
          this.matchedBetList = record.data;
        },
        (error: any) => {}
      );
  }

  getMatchedOddsPl(req: any) {
    this.backendService.getAllRecordsByPost(CONFIG.getMatchOddsPl, req).then(
      (data: any) => {
        this.matchedOddsPl = data.pl;
      },
      (error) => {
        let responseData = error;
      }
    );
  }

  getFancyPl(req: any) {
    this.backendService.getAllRecordsByPost(CONFIG.getFancyPl, req).then(
      (data: any) => {
        this.FancyPl = data.fancyPl;
      },
      (error) => {
        let responseData = error;
      }
    );
  }

  getBookMakerPl(req: any) {
    this.backendService.getAllRecordsByPost(CONFIG.getBookmakersPl, req).then(
      (data: any) => {
        this.BookmakersPl = data.pl;
      },
      (error) => {
        let responseData = error;
      }
    );
  }

  getSportBookPl(req: any) {
    this.backendService.getAllRecordsByPost(CONFIG.getSportsbookPl, req).then(
      (data: any) => {
        this.SportsbookPl = data.pl;
      },
      (error) => {
        let responseData = error;
      }
    );
  }

  trackByFn(index: any) {
    return index;
  }
  ShowMarketManager(marketId: any) {
    if (this.isMobile) {
      if (marketId == this.selectedMarket) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  centerScrollableDiv(tableFlag: any) {
    const centeredDiv = document.getElementById(tableFlag);
    const container = document.getElementById('fancyul');

    // Calculate the center position
    if (centeredDiv && container) {
      const centerX = centeredDiv.offsetLeft + centeredDiv.offsetWidth / 2;

      // Adjust the scrollLeft property to center the div horizontally
      container.scrollLeft = centerX - container.offsetWidth / 2;
    }
  }

  changeFancyMarket(tableFlag: any, onChangeData?: any) {
    const element = document.getElementById(tableFlag);
    if (element && !onChangeData) {
      setTimeout(() => {
        const elementRect = element.getBoundingClientRect();
        const isElementVisible =
          elementRect.top >= 0 &&
          elementRect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight);

        if (isElementVisible && this.isMobile) {
          this.centerScrollableDiv(tableFlag);
          // element.scrollIntoView({ behavior: "smooth", block: "center", inline: 'center' });
        }
      }, 0);
    }
    if (this.isDesktop) {
      this.AllFancyMarketsFiltered = this.AllFancyMarkets.filter(
        (market: any) => {
          if (market?.oddsData?.status != 'CLOSED') {
            return market;
          } else {
            return null;
          }
        }
      ).sort((a: any, b: any) => a.sequence - b.sequence);

      this.AllFancyMarketsSort = this.AllFancyMarketsFiltered.filter(
        (market: any) => {
          if (
            market?.oddsData?.status != 'CLOSED' &&
            market?.tableFlag !== 'SPORTSBOOK'
          ) {
            return market;
          } else {
            return null;
          }
        }
      ).sort((a: any, b: any) => {
        const typeOrder: any = {
          Ballbyball: 0,
          Fancy: 1,
          Linemarket: 2,
        };
        return typeOrder[a.marketType] - typeOrder[b.marketType];
      });
      // console.log(this.AllFancyMarketsSort)

      return;
    }

    this.selectedFancyMarket = tableFlag;

    if (tableFlag == 'SPORTSBOOK' || tableFlag == 'Sportsbook') {
      this.AllFancyMarketsFiltered = this.AllFancyMarkets.filter(
        (market: any) => {
          if (
            market.tableFlag == 'SPORTSBOOK' &&
            market?.oddsData?.status != 'CLOSED' &&
            !market?.popular
          ) {
            return market;
          } else {
            return null;
          }
        }
      ).sort((a: any, b: any) => a.sequence - b.sequence);
    } else {
      // if (this.sportbookSubscription) {
      //   this.sportbookSubscription.unsubscribe()
      // }
      if (tableFlag == 'popular') {
        this.AllFancyMarketsFiltered = this.AllFancyMarkets.filter(
          (market: any) => {
            if (
              market.oddsType == 'FANCY' &&
              market?.oddsData?.status != 'CLOSED'
            ) {
              return market;
            } else {
              return null;
            }
          }
        ).sort((a: any, b: any) => a.sequence - b.sequence);
        return;
      } else {
        this.AllFancyMarketsFiltered = this.AllFancyMarkets.filter(
          (market: any) => {
            if (
              market.marketType !== 'Linemarket' &&
              market.oddsType == 'FANCY' &&
              tableFlag == 'Fancy' &&
              market?.oddsData?.status != 'CLOSED'
            ) {
              return market;
            }
            if (
              market.marketType !== 'Fancy' &&
              market.marketType == tableFlag &&
              market?.oddsData?.status != 'CLOSED'
            ) {
              return market;
            } else {
              return null;
            }
          }
        ).sort((a: any, b: any) => a.sequence - b.sequence);
      }
    }
  }
  changeOddsMarket(marketid: any, tableFlag: any, onChangeOddData?: any) {
    const element = document.getElementById(marketid);
    if (element && this.isMobile && onChangeOddData == 1) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
    }
    this.selectedMarket = marketid;
    if (marketid == 'Popular') {
      this.matchOddsDataUpdated = this.AllMarketList.filter((market: any) => {
        if (market.popular && market?.oddsData?.status !== 'CLOSED') {
          return market;
        } else {
          return null;
        }
      }).sort((a: any, b: any) => a.sequence - b.sequence);
      return;
    }
    if (marketid == 'All') {
      const matchOddsData = this.AllMarketList.filter(
        (market: any) => market?.oddsData?.status !== 'CLOSED'
      );

      const matchOdds = matchOddsData.filter(
        (market: any) => market.marketType === 'MATCH_ODDS'
      );
      const bookmakers = matchOddsData.filter(
        (market: any) =>
          market.marketType === 'Bookmakers-2' &&
          market.marketName.includes('Bookmaker')
      );
      const otherMarkets = matchOddsData
        .filter(
          (market: any) =>
            market.marketType !== 'MATCH_ODDS' &&
            !market.marketName.includes('Bookmaker')
        )
        .sort((a: any, b: any) => b.sequence - a.sequence);

      this.matchOddsDataUpdated = [
        ...matchOdds,
        ...bookmakers,
        ...otherMarkets,
      ];
      // console.log(this.matchOddsDataUpdated)
    } else {
      this.matchOddsDataUpdated = this.AllMarketList.filter((market: any) => {
        if (
          market.exMarketId == marketid &&
          tableFlag == market.marketType &&
          market?.oddsData?.status != 'CLOSED'
        ) {
          return market;
        } else {
          return null;
        }
      }).sort((a: any, b: any) => a.sequence - b.sequence);
    }
  }
  checkJursy(value: any) {
    if (value?.includes('data:image')) {
      return true;
    } else {
      return false;
    }
  }

  getElementByClass(className: string): HTMLElement | null {
    return this.elementRef.nativeElement.querySelector(`.${className}`);
  }

  hasProfitAndLoss(value: any): boolean {
    if (typeof value === 'object' && value !== null) {
      return value.hasOwnProperty('PROFIT') && value.hasOwnProperty('LOSS');
    }
    return false;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    for (const item of this.opendInfoId) {
      const element = document.getElementById(item);

      if (element?.classList.value.includes('show')) {
        const index = this.opendInfoId.indexOf(item);

        if (index > -1) {
          // Value is present in the array, so remove it
          this.opendInfoId.splice(index, 1);
        }
        this.renderer.removeClass(element, 'show');
      }
    }
  }

  gameRules(sportId: any) {
    this.backendService
      .getAllRecordsByPost(CONFIG.getSportsRule, {
        sportId: sportId,
        key: CONFIG.siteKey,
      })
      .then(
        (data: any) => {
          this.rulesInfo = data.data;
        },
        (error) => {
          let responseData = error;
        }
      );
  }

  fancyPL(sportID: any, marketId: any) {
    this.backendService
      .getAllRecordsByPost(CONFIG.marketFancyBook, {
        sportId: sportID,
        marketId: marketId,
      })
      .then(
        (data: any) => {
          let dataFancyPl = data.data;
          this.fancyBook = Object.entries(dataFancyPl).map(([key, value]) => ({
            key,
            value,
          }));
        },
        (error) => {
          let responseData = error;
        }
      );
  }

  calculateCashOut(exMarketId: any, oddType: any, marketType?: any) {
    window.clearInterval(this.intrvlCashOut);
    if (marketType == 'Bookmakers-2') {
      this.cashOutOnIntervalBookmaker2(exMarketId, oddType);
    } else {
      this.cashOutOnInterval(exMarketId, oddType);
    }
    this.intrvlCashOut = window.setInterval(() => {
      if (marketType == 'Bookmakers-2') {
        this.cashOutOnIntervalBookmaker2(exMarketId, oddType);
      } else {
        this.cashOutOnInterval(exMarketId, oddType);
      }
    }, 1000);
  }
  cashOutOnIntervalBookmaker2(exMarketId: any, oddType: any) {
    this.cashoutValue = [];
    for (let i = 0; i < this.AllMarketList.length; i++) {
      if (this.AllMarketList[i].exMarketId == exMarketId) {
        let runnerArr = this.AllMarketList[i].oddsData.runners;
        let userProfitLoss;
        if (oddType == 'MATCH_ODDS') {
          userProfitLoss = this.matchedOddsPl[exMarketId];
        } else {
          userProfitLoss = this.BookmakersPl[exMarketId];
        }

        let getOddsTeam = _.map(runnerArr, function (val: any) {
          let SelBackPri = val['price']['back'][0]['price'];
          let SelLayPri = val['price']['lay'][0]['price'];
          let getSelId = val['selectionId'];

          return {
            selectionId: getSelId,
            backOdds: SelBackPri,
            layOdds: SelLayPri,
          };
        });

        let getFavSelection: any = _.minBy(getOddsTeam, 'backOdds');
        let finalFavoriteSelection = getFavSelection['selectionId'];

        if (
          getFavSelection['backOdds'] == 0 ||
          getFavSelection['layOdds'] == 0
        ) {
          this.cashoutValue = [];
          window.clearInterval(this.intrvlCashOut);
          this.toaster.error('Cash Out is not possible on this odds.', '', {
            positionClass: 'toast-top-right',
          });
          return;
        }

        let getFavPl = userProfitLoss[finalFavoriteSelection];

        let cashOutStake = 0;
        let resPrice = 0;
        let resSide = '';

        let getPlFilter = _.filter(userProfitLoss, function (val: any) {
          if (val < 0) {
            return val;
          }
        });

        if (getPlFilter.length == 2 || getPlFilter.length == 0) {
          let getOtherSel = _.omit(userProfitLoss, finalFavoriteSelection);
          let OthselectionData = _.keys(getOtherSel)[0];
          let PlProfitData = _.values(userProfitLoss);
          let subPl = Math.abs(_.subtract(PlProfitData[0], PlProfitData[1]));

          if (getFavPl > userProfitLoss[OthselectionData]) {
            cashOutStake = parseFloat(
              Number(subPl / (getFavSelection['layOdds'] / 100 + 1)).toFixed(2)
            );
            resPrice = getFavSelection['layOdds'];
            resSide = 'LAY';
          } else {
            cashOutStake = parseFloat(
              Number(subPl / (getFavSelection['backOdds'] / 100 + 1)).toFixed(2)
            );
            resPrice = getFavSelection['backOdds'];
            resSide = 'BACK';
          }
        } else {
          let getTotalPlSum = _.sumBy(_.values(userProfitLoss), function (v) {
            return Math.abs(v);
          });

          if (getFavPl > 0) {
            cashOutStake = parseFloat(
              Number(
                getTotalPlSum / (getFavSelection['layOdds'] / 100 + 1)
              ).toFixed(2)
            );
            resPrice = getFavSelection['layOdds'];
            resSide = 'LAY';
          } else {
            cashOutStake = parseFloat(
              Number(
                getTotalPlSum / (getFavSelection['backOdds'] / 100 + 1)
              ).toFixed(2)
            );
            resPrice = getFavSelection['backOdds'];
            resSide = 'BACK';
          }
        }

        let cashoutValueFinal;
        if (resSide == 'BACK') {
          // let cal = (resPrice * 100) - 100;

          // let totalProfit = Math.ceil((cal / 100) * cashOutStake);
          let totalProfit = resPrice * (cashOutStake / 100);
          cashoutValueFinal = (getFavPl + totalProfit).toFixed(2);
        }
        if (resSide == 'LAY') {
          // let cal = (resPrice * 100) - 100;
          // let totalProfit = Math.ceil((cal / 100) * cashOutStake);
          let totalProfit = resPrice * (cashOutStake / 100);
          cashoutValueFinal = (getFavPl - totalProfit).toFixed(2);
        }

        this.cashoutValue[exMarketId] = cashoutValueFinal;
        if (oddType == 'MATCH_ODDS') {
          this.cashOutAPIData = {
            marketId: exMarketId,
            matchMe: false,
            price: resPrice,
            selectionId: finalFavoriteSelection,
            side: resSide,
            sportId: this.sportId,
            stake: cashOutStake,
            type: 'MATCH_ODDS',
          };
        } else {
          this.cashOutAPIData = {
            index: 0,
            marketId: exMarketId,
            matchMe: false,
            price: resPrice,
            selectionId: finalFavoriteSelection,
            side: resSide,
            sportId: this.sportId,
            stake: cashOutStake,
            type: 'BOOKMAKERS',
          };
        }
      }
    }
  }

  cashOutOnInterval(exMarketId: any, oddType: any) {
    this.cashoutValue = [];

    for (let i = 0; i < this.AllMarketList.length; i++) {
      if (this.AllMarketList[i].exMarketId == exMarketId) {
        let runnerArr = this.AllMarketList[i].oddsData.runners;
        let userProfitLoss;
        if (oddType == 'MATCH_ODDS') {
          userProfitLoss = this.matchedOddsPl[exMarketId];
        } else {
          userProfitLoss = this.BookmakersPl[exMarketId];
        }

        let getOddsTeam = _.map(runnerArr, function (val: any) {
          let SelBackPri = val['price']['back'][0]['price'];
          let SelLayPri = val['price']['lay'][0]['price'];
          let getSelId = val['selectionId'];

          return {
            selectionId: getSelId,
            backOdds: SelBackPri,
            layOdds: SelLayPri,
          };
        });

        let getFavSelection: any = _.minBy(getOddsTeam, 'backOdds');
        let finalFavoriteSelection = getFavSelection['selectionId'];

        if (
          getFavSelection['backOdds'] == 0 ||
          getFavSelection['layOdds'] == 0
        ) {
          this.cashoutValue = [];
          window.clearInterval(this.intrvlCashOut);
          this.toaster.error('Cash Out is not possible on this odds.', '', {
            positionClass: 'toast-top-right',
          });
          return;
        }

        let getFavPl = userProfitLoss[finalFavoriteSelection];

        let cashOutStake = 0;
        let resPrice = 0;
        let resSide = '';

        let getPlFilter = _.filter(userProfitLoss, function (val: any) {
          if (val < 0) {
            return val;
          }
        });

        if (getPlFilter.length == 2 || getPlFilter.length == 0) {
          let getOtherSel = _.omit(userProfitLoss, finalFavoriteSelection);
          let OthselectionData = _.keys(getOtherSel)[0];
          let PlProfitData = _.values(userProfitLoss);
          let subPl = Math.abs(_.subtract(PlProfitData[0], PlProfitData[1]));
          if (getFavPl > userProfitLoss[OthselectionData]) {
            cashOutStake = parseFloat(
              Number(subPl / getFavSelection['layOdds']).toFixed(2)
            );
            resPrice = getFavSelection['layOdds'];
            resSide = 'LAY';
          } else {
            cashOutStake = parseFloat(
              Number(subPl / getFavSelection['backOdds']).toFixed(2)
            );
            resPrice = getFavSelection['backOdds'];
            resSide = 'BACK';
          }
        } else {
          let getTotalPlSum = _.sumBy(
            _.values(userProfitLoss),
            function (v: any) {
              return Math.abs(v);
            }
          );

          if (getFavPl > 0) {
            cashOutStake = parseFloat(
              Number(getTotalPlSum / getFavSelection['layOdds']).toFixed(2)
            );
            resPrice = getFavSelection['layOdds'];
            resSide = 'LAY';
          } else {
            cashOutStake = parseFloat(
              Number(getTotalPlSum / getFavSelection['backOdds']).toFixed(2)
            );
            resPrice = getFavSelection['backOdds'];
            resSide = 'BACK';
          }
        }

        let cashoutValueFinal;
        if (resSide == 'BACK') {
          let cal = resPrice * 100 - 100;
          let totalProfit = Math.ceil((cal / 100) * cashOutStake);
          cashoutValueFinal = (getFavPl + totalProfit).toFixed(2);
        }
        if (resSide == 'LAY') {
          let cal = resPrice * 100 - 100;
          let totalProfit = Math.ceil((cal / 100) * cashOutStake);
          cashoutValueFinal = (getFavPl - totalProfit).toFixed(2);
        }

        this.cashoutValue[exMarketId] = cashoutValueFinal;
        if (oddType == 'MATCH_ODDS') {
          this.cashOutAPIData = {
            marketId: exMarketId,
            matchMe: false,
            price: resPrice,
            selectionId: finalFavoriteSelection,
            side: resSide,
            sportId: this.sportId,
            stake: cashOutStake,
            type: 'MATCH_ODDS',
          };
        } else {
          this.cashOutAPIData = {
            index: 0,
            marketId: exMarketId,
            matchMe: false,
            price: resPrice,
            selectionId: finalFavoriteSelection,
            side: resSide,
            sportId: this.sportId,
            stake: cashOutStake,
            type: 'BOOKMAKERS',
          };
        }
      }
    }
  }

  onCashOutConfirm() {
    if (!this.cashOutAPIData.stake) {
      this.toaster.error('Cash Out not Possible on this Price', '', {
        positionClass: 'toast-top-right',
      });
      return;
    }

    this.loader = true;

    $('.btn-placebet').prop('disabled', true);

    this.backendService
      .getAllRecordsByPost(CONFIG.placebet, this.cashOutAPIData)
      .then(
        (data: any) => {
          if (data.meta.status == true) {
            $('.btn-placebet').prop('disabled', false);
            this.cashoutValue = [];
            window.clearInterval(this.intrvlCashOut);
            this.ProfitLossBalance();
            var req = {
              eventId: this.event_id,
              sportId: this.sportId,
            };
            if (this.cashOutAPIData.type == 'MATCH_ODDS') {
              this.getMatchedOddsPl(req);
            } else {
              this.getBookMakerPl(req);
            }

            this.getUserBalance();

            this.loader = false;
            this.toaster.success(data.meta.message, '', {
              positionClass: 'toast-top-right',
            });
          }
        },
        (error) => {
          $('.quick_bet-wrap .btn-send').prop('disabled', false);

          this.loader = false;

          $('.btn-placebet').prop('disabled', false);
          if (error.error.meta) {
            let errorObject = error.error.meta.message;
            if (typeof errorObject === 'object') {
              for (var key of Object.keys(errorObject)) {
                this.toaster.error(errorObject[key].message, '', {
                  positionClass: 'toast-top-right',
                });
                return;
              }
            } else {
              this.toaster.error(errorObject, '', {
                positionClass: 'toast-top-right',
              });
              return;
            }
          } else {
            this.toaster.error('Hey, looks like something went wrong.', '', {
              positionClass: 'toast-top-right',
            });
            return;
          }
        }
      );
  }

  getUserBalance() {
    this.backendService.getAllRecordsByPost(CONFIG.userBalance, {}).then(
      (data: any) => {
        if (data.meta.status == true) {
          let availBalance = (
            data.data.bankBalance - data.data.exposure
          ).toFixed(2);
          $('.userTotalBalance').text(availBalance);
          $('.userTotalExposure').text(data.data.exposure);
          const Balance = {
            balance: availBalance,
            exposure: data.data.exposure,
          };
          // this.backendService.setBalanceExpo(Balance);
        }
      },
      (error) => {
        let responseData = error;
      }
    );
  }
  muteAudio() {
    this.isMuted = !this.isMuted;
  }
  infoIdsManager(id: any) {
    if (this.opendInfoId.length == 0) {
      this.opendInfoId.push(id);
      return;
    }
    const index = this.opendInfoId.indexOf(id);

    if (index > -1) {
      this.opendInfoId.splice(index, 1);
    } else {
      this.opendInfoId.push(id);
    }
  }

  showLoading() {
    this.loader = true;
  }

  hideLoading() {
    this.loader = false;
  }

  navigateBack() {
    this.location.back();
  }

  showBox(color: string) {
    this.selectedColor = color;
  }
}
