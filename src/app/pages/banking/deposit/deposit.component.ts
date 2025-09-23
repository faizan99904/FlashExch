import { NgFor, NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CONFIG } from '../../../../../config';
import { NetworkService } from '../../../service/network.service';

@Component({
  selector: 'app-deposit',
    imports: [NgFor, NgIf, NgClass],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {

  _amount: any;
  depositDetails: any;

  paymentMethodsImgs = [
    "assets/paymentMethods/auto-pay-bharat-pay.png",
    "assets/paymentMethods/auto-pay-freecharge.png",
    "assets/paymentMethods/auto-pay-google-pay.png",
    "assets/paymentMethods/auto-pay-icici.png",
    "assets/paymentMethods/auto-pay-mobik.png",
    "assets/paymentMethods/auto-pay-paytm.png",
    "assets/paymentMethods/imps.png",
    "assets/paymentMethods/auto-pay-phone-pay.png",
    "assets/paymentMethods/auto-pay-upi.png",
  ];

  classes = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    private networkService: NetworkService,
  ) {
    this.route.params.subscribe(params => {
      this._amount = params['id'];
    });
  }

  ngOnInit(): void {
    this.getDepositDetails();
     setTimeout(() => {
      document.body.style.overflow = 'initial';
    }, 100);
  }

  getDepositDetails() {
    this.networkService.getAllRecordsByPost(CONFIG.getDepositDetails, { amount: parseFloat(this._amount) }).then(
      (data: any) => {
        if (data.meta.status) {
          this.depositDetails = data.data;
        }
      },
      (error: any) => {

      });
//     this.depositDetails = 
//     [
//     {
//         "paymentType": "phonepe",
//         "amount": "300-50000",
//         "accountHolderName": null,
//         "accountNumber": null,
//         "accountType": null,
//         "bankName": null,
//         "bankStatus": "PERMANENT",
//         "transactionLimit": 0,
//         "ifsc": null,
//         "paytmName": null,
//         "paytmNumber": null,
//         "phonepeName": "MS JAGA BALIA HARDWARE",
//         "phonepeNumber": "mab.037134038790184@axisbank",
//         "gpayName": null,
//         "gpayNumber": null,
//         "upiName": null,
//         "upiNumber": null,
//         "qrCodeName": "MS JAGA BALIA HARDWARE",
//         "qrCodeUrl": "https://ambani247.com/app/qrcode/getqrImage/qrcode-uni-202591112814157.jpg",
//         "tokenAddress": null,
//         "bkashName": null,
//         "bkashNumber": null,
//         "rocketName": null,
//         "rocketNumber": null,
//         "nagadName": null,
//         "nagadNumber": null,
//         "currencyType": null,
//         "sellPrice": null,
//         "buyPrice": null,
//         "walletAddress": null,
//         "origin": "ambani247"
//     },
//     {
//         "paymentType": "googlepay",
//         "amount": "300-50000",
//         "accountHolderName": null,
//         "accountNumber": null,
//         "accountType": null,
//         "bankName": null,
//         "bankStatus": "PERMANENT",
//         "transactionLimit": 0,
//         "ifsc": null,
//         "paytmName": null,
//         "paytmNumber": null,
//         "phonepeName": null,
//         "phonepeNumber": null,
//         "gpayName": "MS JAGA BALIA HARDWARE",
//         "gpayNumber": "mab.037134038790184@axisbank",
//         "upiName": null,
//         "upiNumber": null,
//         "qrCodeName": "MS JAGA BALIA HARDWARE",
//         "qrCodeUrl": "https://ambani247.com/app/qrcode/getqrImage/qrcode-uni-2025911128555.jpg",
//         "tokenAddress": null,
//         "bkashName": null,
//         "bkashNumber": null,
//         "rocketName": null,
//         "rocketNumber": null,
//         "nagadName": null,
//         "nagadNumber": null,
//         "currencyType": null,
//         "sellPrice": null,
//         "buyPrice": null,
//         "walletAddress": null,
//         "origin": "ambani247"
//     },
//     {
//         "paymentType": "paytm",
//         "amount": "300-50000",
//         "accountHolderName": null,
//         "accountNumber": null,
//         "accountType": null,
//         "bankName": null,
//         "bankStatus": "PERMANENT",
//         "transactionLimit": 0,
//         "ifsc": null,
//         "paytmName": "MS JAGA BALIA HARDWARE",
//         "paytmNumber": "mab.037134038790184@axisbank",
//         "phonepeName": null,
//         "phonepeNumber": null,
//         "gpayName": null,
//         "gpayNumber": null,
//         "upiName": null,
//         "upiNumber": null,
//         "qrCodeName": "MS JAGA BALIA HARDWARE",
//         "qrCodeUrl": "https://ambani247.com/app/qrcode/getqrImage/qrcode-uni-202591112915564.jpg",
//         "tokenAddress": null,
//         "bkashName": null,
//         "bkashNumber": null,
//         "rocketName": null,
//         "rocketNumber": null,
//         "nagadName": null,
//         "nagadNumber": null,
//         "currencyType": null,
//         "sellPrice": null,
//         "buyPrice": null,
//         "walletAddress": null,
//         "origin": "ambani247"
//     },
//     {
//         "paymentType": "bank",
//         "amount": "300-50000",
//         "accountHolderName": "BIVEK SAHU",
//         "accountNumber": "20200115621141",
//         "accountType": "saving",
//         "bankName": "BANDHAN BANK",
//         "bankStatus": "PERMANENT",
//         "transactionLimit": 0,
//         "ifsc": "BDBL0002400",
//         "paytmName": null,
//         "paytmNumber": null,
//         "phonepeName": null,
//         "phonepeNumber": null,
//         "gpayName": null,
//         "gpayNumber": null,
//         "upiName": null,
//         "upiNumber": null,
//         "qrCodeName": null,
//         "qrCodeUrl": "",
//         "tokenAddress": null,
//         "bkashName": null,
//         "bkashNumber": null,
//         "rocketName": null,
//         "rocketNumber": null,
//         "nagadName": null,
//         "nagadNumber": null,
//         "currencyType": null,
//         "sellPrice": null,
//         "buyPrice": null,
//         "walletAddress": null,
//         "origin": "ambani247"
//     }
// ]
    
  }

   trackByFn(index: any, item: any) {
    return index;
  }
  DepositDetails(item:any){
    this.networkService.setDepositBank(item);
    this.router.navigate(['/banking/deposit-details/'+this._amount]);
  }
}
