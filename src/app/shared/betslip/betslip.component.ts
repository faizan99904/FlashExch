import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ToastrService } from 'ngx-toastr';
import { CONFIG, STACK_VALUE } from '../../../../config';
import { IndexedDbService } from '../../service/indexed-db.service';
import { NetworkService } from '../../service/network.service';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-betslip',
  imports: [CommonModule, FormsModule],
  templateUrl: './betslip.component.html',
  styleUrl: './betslip.component.css',
})
export class BetslipComponent {
  profit!: number;
  editStakeMode = false;
  stakeButtonsBeforeLogin = [100, 200, 500, 1000, 2000, 5000];
  stakeButtonsAfterLogin = [1000, 2000, 5000];
  editableStakes: number[] = [];
  odds: number = 1.58;


  // above code khtm krien gy
  stake: any = '';
  exposure: any;
  selectedAmount: any;
  @Input() item: any = { price: '' };

  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newItemEventPlaceBet = new EventEmitter<string>();
  @Output() loaderEventPlaceBet = new EventEmitter<boolean>();
  @Output() valueEventPlaceBet = new EventEmitter<any>();
  @ViewChild('betAmount') betAmount: ElementRef | undefined;

  color: string = '';
  betStakes: any = [];
  betslipRecord: any;
  isbetPlacing: boolean = false;
  isMobile: any;
  isDesktop: any;
  private lowerUpperArry = [{
    increment: 0.01,
    lowerBound: 1.01,
    upperBound: 2
  }, {
    increment: 0.02,
    lowerBound: 2,
    upperBound: 3
  }, {
    increment: 0.05,
    lowerBound: 3,
    upperBound: 4
  }, {
    increment: 0.1,
    lowerBound: 4,
    upperBound: 6
  }, {
    increment: 0.2,
    lowerBound: 6,
    upperBound: 10
  }, {
    increment: 0.5,
    lowerBound: 10,
    upperBound: 20
  }, {
    increment: 1,
    lowerBound: 20,
    upperBound: 30
  }, {
    increment: 2,
    lowerBound: 30,
    upperBound: 50
  }, {
    increment: 5,
    lowerBound: 50,
    upperBound: 100
  }, {
    increment: 10,
    lowerBound: 100,
    upperBound: 1000
  }];
  matchMeSwitch: any;
  isLoader: boolean = false;
  placeBetObj: any = {
    profitlossCall: false,
    loader: false
  };
  constructor(
    private deviceService: DeviceDetectorService,
    private backendservice: NetworkService,
    private indexedDb: IndexedDbService,
    private mainService: MainService,
    private toaster: ToastrService,

    private router: Router) {
    this.isDesktop = this.deviceService.isDesktop();
    // Check if the current device is a mobile
    this.isMobile = this.deviceService.isMobile();
    effect(() => {
      const betData = this.mainService.getbetslip();
      this.item = betData;
      // console.log('betslip data', betData);
    });
    // console.log('betslip component initialized',this.item);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'].previousValue && changes['item'].currentValue) {
      const currentvalue = changes['item'].currentValue;
      const previousvalue = changes['item'].previousValue;
      if (currentvalue.selectionId !== previousvalue.selectionId || currentvalue.price !== previousvalue.price) {
        this.selectedAmount = '';
        this.color = this.item.side;
        if (this.betAmount != undefined) {
          this.betAmount.nativeElement.focus();
        }
      }
      // Access the input value when it changes
    }
  }


  ngOnInit(): void {


    // removalbel part 
    this.loginState();
    this.editableStakes = [...this.getCurrentStakeButtons()];
    // 

    this.item;
    this.getBetStake();

    this.matchMeSwitch = JSON.parse(localStorage.getItem('matchMe') as string) ? JSON.parse(localStorage.getItem('matchMe') as string) : false;
  }
  ngAfterViewInit() {

  }
  getBetStake() {
    const path = CONFIG.userBetStakeList.split('/').filter(Boolean).pop();
    this.indexedDb.getRecord(path).subscribe((res: any) => {

      if (res?.data && res?.data !== null) {
        this.betStakes = res?.data?.stake;
      }
      else {
        if (!this.betStakes || this.betStakes.length < 1 || this.betStakes == undefined) {
          this.betStakes = STACK_VALUE;
          let data1 = {
            data: {
              stake: STACK_VALUE
            }

          }
          this.indexedDb.createRecord(path, data1).subscribe((res: any) => {
          });
        }
      }


    })
  }



  setStake(amount: any) {
    this.selectedAmount = amount;
    let emitObj = {
      stake: amount,
      price: this.item.price
    }
    this.valueEventPlaceBet.emit(emitObj);

  }



  plusStake(Amount: any) {
    // this.item.selectedAmount?this.item.selectedAmount=this.item.selectedAmount+1:this.item.selectedAmount=100;

  }

  minusStake(Amount: any) {
    // this.item.selectedAmount?this.item.selectedAmount>100?this.item.selectedAmount=this.item.selectedAmount-1:this.item.selectedAmount=100:this.item.selectedAmount=100;


  }
  cancelBet() {
    let betData = {
        exposure: '',
        stackValue: ''
      }
    this.item = null;
    this.placeBetObj.profitlossCall = false;
    this.placeBetObj.loader = false;
    this.backendservice.setBetPlace(this.placeBetObj);
    this.mainService.setExposureProfit(betData);
  }




  afterPlaceBet() {
    this.item = null;
    this.placeBetObj = {
      profitlossCall: true,
      loader: false,
    }
    this.backendservice.setBetPlace(this.placeBetObj);

  }
  inputAmount(value: any) {
    this.selectedAmount = value.target.value;
    let emitObj = {
      stake: value.target.value,
      price: this.item.price
    }
    this.valueEventPlaceBet.emit(emitObj);

  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;

  }


  onChangeMatchMe() {
    localStorage.setItem('matchMe', JSON.stringify(this.matchMeSwitch));
  }

  placeBet() {
    const token = localStorage.getItem('token');
    this.matchMeSwitch = JSON.parse(localStorage.getItem('matchMe') as string);

    if (!token) {
      this.toaster.error("Log In first", '', { positionClass: 'toast-top-right' });
      this.router.navigate(['/login']);
      return;
    }

    this.showLoading();
    this.isbetPlacing = true;

    let url = CONFIG.placebet;
    let data: any;

    const item = this.item;

    // Special handling for mobile
    if (this.isMobile) {
      this.placeBetObj.profitlossCall = false;
      this.placeBetObj.loader = true;
      this.backendservice.setBetPlace(this.placeBetObj);
    }

    const commonFields = {
      marketId: item.marketId,
      sportId: item.sportId,
      stake: this.stake,
      price: item.price,
      side: (item.betType?.toString() || '').toUpperCase(),
      matchMe: !!this.matchMeSwitch
    };

    switch (item?.type) {
      case 'FANCY':
      case 'MATCH_ODDS':
        if (item.isSuperFancy) {
          data = { ...commonFields, type: item.type, selectionId: item.selectionId, size: item.size, index: item.index };
        } else {
          data = { ...commonFields, type: item.type, selectionId: item.selectionId, size: item.size };
        }
        break;

      case 'LINEMARKET':
        data = item.isSuperFancy
          ? { ...commonFields, type: item.type, selectionId: item.selectionId, size: item.size, index: item.index }
          : { ...commonFields, type: item.type, selectionId: item.selectionId, size: item.size };
        break;

      case 'Ballbyball':
        data = {
          ...commonFields,
          selectionId: item.size,
          type: item.oddsType,
          size: item.size
        };
        break;

      case 'Lottery':
        url = CONFIG.lotteryPlaceBet;
        data = {
          marketId: item.marketId,
          eventId: item.eventId,
          selectionNo: item.selectionId,
          sportId: item.sportId,
          stake: this.selectedAmount,
          type: item.oddsType
        };
        break;

      default:
        data = {
          ...commonFields,
          type: item.type,
          selectionId: item.selectionId,
          index: item.index
        };
        break;
    }

    this.backendservice.getAllRecordsByPost(url, data).then(
      (res: any) => {
        this.isbetPlacing = false;
        this.hideLoading();

        if (res?.meta?.status) {
          this.toaster.success(res.meta.message, '', { positionClass: 'toast-top-right' });
          this.afterPlaceBet();
          this.getBalance();
        } else {
          this.toaster.error(res?.meta?.message || "Something went wrong, please try again.", '', { positionClass: 'toast-top-right' });
          this.cancelBet();
        }
      },
      (error: any) => {
        this.isbetPlacing = false;
        this.hideLoading();

        const message = error?.error?.meta?.message || "Something went wrong, please try again.";
        this.toaster.error(message, '', { positionClass: 'toast-top-right' });
        this.cancelBet();
      }
    );
  }
  getBalance() {
    this.backendservice.getAllRecordsByPost(CONFIG.userBalance, {})
      .then(
        (data: any) => {

          if (data.meta.status == true) {
            let availBalance = (data.data.bankBalance - data.data.exposure).toFixed(2)
            $('.userTotalBalance').text(availBalance);
            $('.userTotalExposure').text(data.data.exposure);
            const Balance = {
              balance: availBalance,
              exposure: data.data.exposure
            }
            // this.backendservice.setBalanceExpo(Balance);
          }
        },)
  }
  betExposure() {

    if (this.item?.marketType === 'Bookmakers-2') {
      this.exposure = (this.item?.price / 100) * this.stake ? ((this.item?.price / 100) * this.stake) : null;
      let betData = {
        exposure: this.exposure,
        stackValue: this.stake
      }
      this.mainService.setExposureProfit(betData);
    } else {
      this.exposure = (this.item?.price - 1) * this.stake ? ((this.item?.price - 1) * this.stake) : null;
      let betData = {
        exposure: this.exposure,
        stackValue: this.stake
      }
      this.mainService.setExposureProfit(betData);
    }


  }
  upValue() {
    if (this.item.type == 'FANCY' || this.item.type == 'BOOKMAKERS' || this.item.type == 'SPORTSBOOK') {
      return;
    }

    if (!this.item.price) {
      return
    }

    let c = this.item.price;

    var increment = 0;

    if (c >= this.lowerUpperArry[9].upperBound) {
      increment = this.lowerUpperArry[9].increment;
    }
    for (var b = 0; b < this.lowerUpperArry.length; b++) {
      if ((c >= this.lowerUpperArry[b]["lowerBound"]) && (c < this.lowerUpperArry[b]["upperBound"])) {
        increment = this.lowerUpperArry[b].increment;
      }
    }

    let newVal = Number(this.item.price) + increment;
    this.item.price = newVal.toFixed(2);
    if (this.item.type == 'KHADO') {
      this.item.price = ~~newVal;
    }

    let emitObj = {
      stake: this.selectedAmount,
      price: this.item.price
    }
    this.betExposure()
    this.valueEventPlaceBet.emit(emitObj);
  }

  downValue() {
    if (this.item.type == 'FANCY' || this.item.type == 'BOOKMAKERS' || this.item.type == 'SPORTSBOOK') {
      return;
    }

    if (!this.item.price) {
      return
    }
    let c = this.item.price;
    var increment: any;
    if (c >= this.lowerUpperArry[9].upperBound) {
      increment = this.lowerUpperArry[9]
    }
    for (var b = 0; b < this.lowerUpperArry.length; b++) {
      if ((c > this.lowerUpperArry[b]["lowerBound"]) && (c <= this.lowerUpperArry[b]["upperBound"])) {
        increment = this.lowerUpperArry[b].increment;
      }
    }

    if (this.item.price <= 1.01) {
      this.item.price = this.item.price;
    } else {
      let newVal = Number(this.item.price) - increment;
      this.item.price = newVal.toFixed(2);
      if (this.item.type == 'KHADO') {
        this.item.price = ~~newVal;
      }
    }
    let emitObj = {
      stake: this.selectedAmount,
      price: this.item.price
    }
    this.valueEventPlaceBet.emit(emitObj);
    this.betExposure()
  }

  showLoading() {
    this.isLoader = true;
  }

  hideLoading() {
    this.isLoader = false;
  }

  // removalbel part below

  login: any;

  loginState(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null && token !== '') {
      this.login = true;
    } else {
      this.login = false;
    }
    return this.login;
  }

  addStake(amount: number): void {
    const current = parseInt(this.stake || '0', 10);
    const validCurrent = isNaN(current) ? 0 : current;
    const newStake = validCurrent + amount;
    this.stake = String(newStake);
    // this.updateProfit();
  }

  // updateProfit(): void {
  //   setTimeout(() => {
  //     const parsedStake = parseInt(this.stake || '0', 10);
  //     const validStake = isNaN(parsedStake) ? 0 : parsedStake;
  //     this.profit = validStake * 2;
  //   });
  // }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  setMinStake(): void {
    this.stake = '100';
    this.profit = 100 * 2;
  }

  setMaxStake(): void {
    this.stake = '250000';
    this.profit = 250000 * 2;
  }

  clearStake(): void {
    this.stake = '';
    this.profit = 0;
  }

  getCurrentStakeButtons(): number[] {
    return this.login
      ? this.stakeButtonsAfterLogin
      : this.stakeButtonsBeforeLogin;
  }

  toggleEditStake(): void {
    this.editStakeMode = !this.editStakeMode;
    this.editableStakes = [...this.getCurrentStakeButtons()];
  }

  updateStake(index: number, value: number) {
    this.editableStakes[index] = value;
  }

  saveEditedStakes(): void {
    if (this.login) {
      this.stakeButtonsAfterLogin = [...this.editableStakes];
    } else {
      this.stakeButtonsBeforeLogin = [...this.editableStakes];
    }
    this.editStakeMode = false;
  }

  // increaseOdds() {
  //   console.log('increaseOdds called');
  //   this.odds = parseFloat((this.odds + 0.01).toFixed(2));
  // }

  // decreaseOdds() {
  //    console.log('decreaseOdds called');
  //   const newOdds = this.odds - 0.01;
  //   this.odds = newOdds > 0 ? parseFloat(newOdds.toFixed(2)) : this.odds;
  // }
  // 
}
