import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList,ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { NetworkService } from '../../../service/network.service';
import { CONFIG } from '../../../../../config';

@Component({
  selector: 'app-withdraw',
  imports: [CommonModule, NgIf, NgFor, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent implements OnInit{
@ViewChild('otpVerifyModal', { static: true }) modalEl!: ElementRef<HTMLDivElement>;
  otpForm!: FormGroup;
  isVisible: boolean = false;
  showtext = '';
  text: any;
  calculateAmount = {
    amount: '',
    fee: '',
    time: '',
    withdrawalAmount: ''
  }
  apiCall = false;
  WithdrawalList: any = [];
  cancelRequestId: any;
  themeConfig: any;
  successReceipt: any;
  note: any;
  wihtdrawlOTPAuthenticate: boolean = false;
  @ViewChildren('otpBox') otpBoxes!: QueryList<ElementRef>;

  constructor(private httpClient: HttpClient,
    private toaster: ToastrService, private fb: FormBuilder, 
    private networkService: NetworkService) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    // this.themeConfig = JSON.parse(localStorage.getItem('getThemeConfig') as string);

    setTimeout(() => {
      let input = document.getElementById('withdrawAmountInput');
      input?.focus()
    }, 500);
    
    this.latestWithdrawalList();
    this.otpForm = this.fb.group({
      digits: this.fb.array(Array(6).fill('').map(() => this.fb.control('')))
    });

  }


  latestWithdrawalList() {
    this.networkService.getAllRecordsByPost(CONFIG.latestWithdrawalList, {})
      .then(
        (res: any) => {
          this.WithdrawalList = res.data;
        }).catch(
          error => {
            let responseData = error;
          });
  }

  onAmountChange(newValue: string) {
    if (newValue) {

      this.calculateWithdrawAmt(newValue);
      if (newValue.toString().length > 0) {
        this.isVisible = true
      } else {
        this.isVisible = false
      }
    } else {
      this.isVisible = false

    }

  }

  viewReceipt(id: any) {
    this.networkService.getAllRecordsByPost(CONFIG.successWithdrawalReceipt, { id })
      .then(
        (data: any) => {
          this.successReceipt = data;
          console.log(this.successReceipt);
        }).catch(
          error => {
            this.networkService.ErrorNotification_Manager(error.error)
          });
  }
  calculateWithdrawAmt(amount: any) {
    this.httpClient
      .post<any>(CONFIG.calculateWithdrawAmt, { amount: parseFloat(amount) })
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.meta.status) {
            this.calculateAmount.amount = data.data.amount;
            this.calculateAmount.fee = data.data.fee;
            this.calculateAmount.time = data.data.time;
            this.calculateAmount.withdrawalAmount = data.data.withdrawalAmount;
          }
        },
        (error) => {
          console.log('err0r', error)
          this.networkService.ErrorNotification_Manager(error.error)
        }
      );
  }

  withdrawalAmount(amount: any) {

    if (!amount) {
      return
    }
    
    let req: any = {
      amount: amount.toString()
    }
    if (this.wihtdrawlOTPAuthenticate) {
      req.otpStatus = 'SEND';
    }
    this.apiCall = true;
    this.httpClient
      .post<any>(CONFIG.withdrawalRequest, req)
      .pipe(first())
      .subscribe(
        (data) => {
          this.apiCall = false;
          if (data.meta.status) {
            
              this.text = '';
              this.toaster.success('Success', 'Withdrawal request sent successfully!);');
              this.latestWithdrawalList();
            

          }
        },
        (error) => {
          this.apiCall = false;
          this.networkService.ErrorNotification_Manager(error.error)
        }
      );
  }


  trackByFn(index: any, item: any) {
    return index;
  }

  getLocalTime(date: Date) {
    var res = new Date(date);
    return moment(res, "MM-DD-YYYY HH:mm:ss").format('DD-MM-YYYY HH:mm:ss');
  }

  cancelWithDrawRequest(id: any) {
    this.networkService.getAllRecordsByPost(CONFIG.cancelWithdrawalRequest, { id })
      .then(
        (data: any) => {
          this.toaster.success(data.meta.message, '');
          this.latestWithdrawalList();
        }).catch(
          error => {
            this.networkService.ErrorNotification_Manager(error.error)
          });
  }

  cancelRequest(id: any) {
    this.cancelRequestId = id;
  }
  onInput(event: any, index: number) {
    const input = event.target.value;
    if (input && index < this.otpBoxes.length - 1) {
      this.otpBoxes.toArray()[index + 1].nativeElement.focus();
    }
  }


}
