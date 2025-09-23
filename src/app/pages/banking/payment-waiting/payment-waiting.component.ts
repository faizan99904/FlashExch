import { CommonModule, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NetworkService } from '../../../service/network.service';
import { CONFIG } from '../../../../../config';

@Component({
  selector: 'app-payment-waiting',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './payment-waiting.component.html',
  styleUrl: './payment-waiting.component.css'
})
export class PaymentWaitingComponent implements OnInit{
userBalanceTotal: any={};
  interval:any;
  amount:any;
  utr:any;
  method:any;
  constructor(private backendService: NetworkService,
    private toaster:ToastrService,
    private router:Router,
    private route:ActivatedRoute
  ) {
   this.route.params.subscribe(params => {
        this.amount = params['amount'];
        this.method = params['method'];
        this.utr = params['utr'];
      });
  }
  SliderList:any=[];
  balanceinterval:any;
  PayId:any;
  ngOnInit(): void {
    this.PayId = localStorage.getItem('paymentId')
    this.getuserBalance();
    this.getDepositStatus();
   
    this.interval = window.setInterval(() => {
      this.getDepositStatus();
    }, 10000);
   
  }
  ngOnDestroy(): void {
    window.clearInterval(this.interval);
  }
   
  getuserBalance() {
    this.backendService.getAllRecordsByPost(CONFIG.userBalance, {})
      .then(
        (res: any) => {
          this.userBalanceTotal = res.data;
        }).catch(
          error => {
            let responseData = error;
          });
  }
  getDepositStatus(){
    this.backendService.getAllRecordsByPost(CONFIG.getDepositStatus, {id:this.PayId})
    .then(
      (res: any) => {
        if((res.data.status=='SUCCESS')){
          this.toaster.success('FUNDS CREDITED SUCCESSFULLY ');
          this.router.navigateByUrl('/')
          localStorage.removeItem('paymentId');
          window.clearInterval(this.interval);
        }
      }).catch(
        error => {
          let responseData = error;
        });
  }
  progress = 64;               // update as you poll the server
etaText = '~1–2 min';        // compute from remaining time
currentBalance = 101132;


 copyMessage(val: any) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toaster.info('Copied to clipboard!', '');
  }
openSupport() { /* open chat / link */ }
}
