import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

import { take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CdkCopyToClipboard } from "@angular/cdk/clipboard";
import { NetworkService } from '../../../service/network.service';
import { CompressImageService } from '../../../service/compress-image.service';
import { CONFIG } from '../../../../../config';


type Payment = Record<string, any>;

const FIELD_MAP: Record<string, { name: string; number: string; qr?: string }> = {
  phonepe: { name: 'phonepeName', number: 'phonepeNumber', qr: 'phonepeQrCodeUrl' },
  gpay:    { name: 'gpayName',    number: 'gpayNumber',    qr: 'gpayQrCodeUrl' },
  paytm:   { name: 'paytmName',   number: 'paytmNumber',   qr: 'paytmQrCodeUrl' },
  upi:     { name: 'upiName',     number: 'upiNumber',     qr: 'upiQrCodeUrl' },

  // Bangladesh wallets (if you use them)
  bkash:   { name: 'bkashName',   number: 'bkashNumber',   qr: 'bkashQrCodeUrl' },
  rocket:  { name: 'rocketName',  number: 'rocketNumber',  qr: 'rocketQrCodeUrl' },
  nagad:   { name: 'nagadName',   number: 'nagadNumber',   qr: 'nagadQrCodeUrl' },

  // Bank transfer
  bank:    { name: 'accountHolderName', number: 'accountNumber' },

  // Crypto (example)
  crypto:  { name: 'walletAddress', number: 'walletAddress', qr: 'cryptoQrCodeUrl' },
};

@Component({
  selector: 'app-deposit-details',
   imports: [CommonModule, FormsModule, CdkCopyToClipboard],
  templateUrl: './deposit-details.component.html',
  styleUrl: './deposit-details.component.css'
})
export class DepositDetailsComponent implements OnInit,OnDestroy{
 payment: Payment={};
 _amount:any=0;
  depositDetails:any={};
  themeConfig:any={};
  private intervalId?: number;
  subscription: any;
  private readonly destroyRef = inject(DestroyRef);
  timeLeftSec = 10 * 60; 
  display = this.format(this.timeLeftSec);
  minMaxArr = [];
  selectedImage: string | ArrayBuffer | null | undefined | any;
  fileToUpload: any;
  imgUrl: any;
  utrNumber: any = '';
  originalFileName:any;
  isRunxch:boolean=false;
  note:any;
  apicall = false;
  amountForDisplay:any;
  paymentMethodsImgs = [
    "assets/paymentMethods/auto-pay-bharat-pay.png",
    "assets/paymentMethods/auto-pay-freecharge.png",
    "assets/paymentMethods/auto-pay-google-pay.png",
    "assets/paymentMethods/auto-pay-icici.png",
    "assets/paymentMethods/auto-pay-mobik.png",
    "assets/paymentMethods/auto-pay-paytm.png",
    "assets/paymentMethods/auto-pay-phone-pay.png",
    "assets/paymentMethods/auto-pay-upi.png",
  ];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private toaster: ToastrService,
      private networkService: NetworkService,
      private location:Location,
      private compressImage:CompressImageService
    ) {
      this.route.params.subscribe(params => {
        this._amount = params['id'];
        this.amountForDisplay = this._amount;
      });
    }
  ngOnDestroy(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
    if(this.subscription){
      this.subscription.unsubscribe();
    } 
  }

   ngOnInit(): void {
    this.themeConfig = JSON.parse(localStorage.getItem('getThemeConfig') as string);
    this.getDepositDetails();
    this.updateDisplay();

  

    // tick every second
    this.intervalId = window.setInterval(() => {
      if (this.timeLeftSec > 0) {
        this.timeLeftSec--;
        this.updateDisplay();
      } else {
        clearInterval(this.intervalId);
        // TODO: fire completion action here
      }
    }, 1000);

    // cleanup
    this.destroyRef.onDestroy(() => {
      if (this.intervalId) clearInterval(this.intervalId);
    });
  }
   copyWholeDetail(depositDetails:any){
    let string = `
    AccountHolder:\t${depositDetails?.accountHolderName}\n
    BankName:\t${depositDetails?.bankName}\n
    AccountNumber:\t${depositDetails?.accountNumber}\n
    IFSC:\t${depositDetails?.ifsc}
    `;
    // console.log(string);
    this.copyMessage(string);
   } 
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
   private updateDisplay() {
    this.display = this.format(this.timeLeftSec);
  }

  private format(totalSec: number): string {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  }
  gotoBack(){
    this.location.back();
  }
  getDepositDetails(){
   this.subscription = this.networkService.getDepositBank().subscribe(data=>{
    if(data!=null){
      // console.log(data);
      this.depositDetails=data;
      this.minMaxArr = this.depositDetails.amount.split('-').map((s:any) => Number(s.trim()));
      this.payment = this.depositDetails;
      if(this.depositDetails?.paymentType=='crypto'){
        this.amountForDisplay = this._amount/this.depositDetails.buyPrice;
      }
    }
    setTimeout(() => {
      if(!this.depositDetails.paymentType){
         this.gotoBack()
      }
    }, 500);
      
    });
  }
    onFileSelected(event: any): void {
      const file: File = event.target.files[0];
      if (file) {
        this.originalFileName = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = reader.result;
        };
  
        reader.readAsDataURL(file);
  
        this.compressImage.compress(event.target.files[0])
          .pipe(take(1))
          .subscribe(compressedImage => {
            reader.readAsDataURL(compressedImage);
            this.fileToUpload = compressedImage;
          });
          
  
      } else {
        this.selectedImage = ''; // Reset the selectedImage if no file is selected
        this.imgUrl = '';
        this.originalFileName='';
      }
    }
    resetImage() {
    this.selectedImage = '';
    this.imgUrl = '';
    this.utrNumber = '';
    this.originalFileName='';
  }
 onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    
    const sanitizedValue = inputElement.value.replace(/[^a-zA-Z0-9]/g, '');
    if (sanitizedValue !== inputElement.value) {
      
      inputElement.value = sanitizedValue;
      this.utrNumber = sanitizedValue;
    }
  }
    onSubmitImg() {
  

      if (!this.fileToUpload) {
        this.toaster.error("Please select payment image", '');
        return;
      }
      if(this.utrNumber.length==0 || !this.utrNumber || this.utrNumber==''){
        this.setBorderColor()
        this.toaster.error("Please add the UTR Number", '');
        return;
      }
      let limitUTR = this.isRunxch?8:12;
      if(this.utrNumber.length<limitUTR ){
        this.setBorderColor()
        this.toaster.error("Please add Proper UTR Number", '');
        return;
      }
      if(this.utrNumber.length > limitUTR){
        this.setBorderColor()
        this.utrNumber = this.utrNumber.replace(/\s+/g, ''); // Removes all spaces
        const utrNumberRegex = /^[a-zA-Z0-9]+$/;
        if (!utrNumberRegex.test(this.utrNumber)) {
          this.toaster.error('UTR Number must contain only letters and numbers, with no spaces or special characters.', '', {
            positionClass: 'toast-top-center',
          });
          return
        }
      }
      
  
  
      this.apicall = true;
      let formData = new FormData();
      formData.append('amount', this._amount);
      formData.append('paymentImage', this.fileToUpload);
      formData.append('operatorId', JSON.stringify(this.depositDetails?.operatorId));
      formData.append('operatorName', JSON.stringify(this.depositDetails?.operatorName));
      formData.append('utr', this.utrNumber.length > 0 ? JSON.stringify(this.utrNumber) : JSON.stringify(null));
  
      this.networkService.getAllRecordsByPost(CONFIG.createDepositTransaction, formData)
        .then(
          (res: any) => {
            this.apicall = false;
            if (res.meta.status_code == 200) {
              this.selectedImage = '';
              localStorage.setItem('paymentId', res.data)
              this.toaster.success(res.meta.message, '');
              this.router.navigate(['/banking/payment-waiting/'+this._amount+'/'+this.utrNumber+'/'+this.depositDetails?.paymentType]);
            }
  
          }).catch(
            error => {
              let responseData = error;
              this.apicall = false;
              // this.backendService.ErrorNotification_Manager(error);
            });
  
    }
    setBorderColor(): void {
    const elements = document.querySelectorAll('.utrNumber') as NodeListOf<HTMLElement>;
    elements.forEach(element => {
      element.style.setProperty('border', '1px solid red', 'important');
    });
  }
  paymentView() {
    const type = String(this.payment['paymentType'] || '').toLowerCase();
    const meta = FIELD_MAP[type];

    const name   = meta ? this.payment[meta.name]   ?? null : null;
    const number = meta ? this.payment[meta.number] ?? null : null;
   

    return {
      type,
      label: toLabel(type),
      name,
      number,
    };
  }
}

function toLabel(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
}