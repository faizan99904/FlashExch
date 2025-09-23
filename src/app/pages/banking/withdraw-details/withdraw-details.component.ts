import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, throwError } from 'rxjs';
import { NetworkService } from '../../../service/network.service';
import { CONFIG } from '../../../../../config';
declare var $: any;

@Component({
  selector: 'app-withdraw-details',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgIf,NgFor,NgClass],
  templateUrl: './withdraw-details.component.html',
  styleUrl: './withdraw-details.component.css'
})
export class WithdrawDetailsComponent implements OnInit{
dropdonw = false;
  isIconUp :any=[];
  isIcondwon = false
  withdrawalBankDetails: any=[];
  withdrawalPaytmDetails: any=[];
  withdrawalGooglePayDetails: any=[];
  withdrawalPhonePeDetails: any=[];
  withdrawalNagadDetails: any=[];
  withdrawalBkashDetails: any=[];
  withdrawalRocketDetails: any=[];
  deleteItemId: any;
  isRunxch:boolean=false;
  bankData = {
    id: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    holderName: ''
  };

  paytmData = {
    id: '',
    name: '',
    paytmNumber: '',
  }

  googlepayData = {
    id: '',
    name: '',
    gpayNumber: '',
  }

  phonepeData = {
    id: '',
    name: '',
    phonepeNumber: '',
  }

  constructor(
    private toaster: ToastrService,
    private httpClient: HttpClient,
    private backendService:NetworkService
  ) { }

  ngOnInit(): void {
    this.userWithdrawBankList();
    const domainsForWithoutOTP = [
      "https://runxch.com"
    ]
    const currentOriginComplete = window.location.origin;
    const currentOrigin = currentOriginComplete.replace(/\/\/www\./, '//');

    if (domainsForWithoutOTP.includes(currentOrigin)) {
      this.isRunxch = true;
    }
  }

  addNewDetailsEvent(type: any) {
    if(type === 'phonepe'){
      this.phonepeData.id = '';
      this.phonepeData.name = '';
      this.phonepeData.phonepeNumber = '';
    }
    else if(type === 'googlepay') {

    }
    else if(type === 'paytm') {

    }
    else if(type === 'bank') {

    }
  }

  userWithdrawBankList() {
    this.httpClient
      .post<any>(CONFIG.userWithdrawBankList, {})
      .pipe(
        first(),
        catchError((error) => {
          const errorMessage = error?.error?.meta?.message || 'Something went wrong.. please try again!';
          return throwError(errorMessage); // Rethrow the error to propagate it to the calling component.
        })
      )
      .subscribe((data) => {
        if (data?.meta?.status) {
          this.withdrawalBankDetails = data?.data?.bankDetails;
          this.withdrawalPaytmDetails = data?.data?.upiDetails?.paytm;;
          this.withdrawalGooglePayDetails = data?.data?.upiDetails?.gpay;
          this.withdrawalPhonePeDetails = data?.data?.upiDetails?.phonepe;
          this.withdrawalNagadDetails = data?.data?.upiDetails?.nagad || []
          this.withdrawalBkashDetails = data?.data?.upiDetails?.bkash || [];
          this.withdrawalRocketDetails = data?.data?.upiDetails?.rocket || [];
          // this.bankData.bankName = this.withdrawalBankDetails?.bankName;
          // this.bankData.accountNumber = this.withdrawalBankDetails?.accountNumber;
          // this.bankData.holderName = this.withdrawalBankDetails?.accountHolderName;
          // this.bankData.ifsc = this.withdrawalBankDetails?.ifsc;
          // this.bankData.id = this.withdrawalBankDetails?.id;

          // this.paytmData.id = this.withdrawalPaytmDetails?.id;
          // this.paytmData.name = this.withdrawalPaytmDetails?.paytmName;
          // this.paytmData.paytmNumber = this.withdrawalPaytmDetails?.paytmNumber;

          // this.googlepayData.id = this.withdrawalGooglePayDetails?.id;
          // this.googlepayData.name = this.withdrawalGooglePayDetails?.gpayName;
          // this.googlepayData.gpayNumber = this.withdrawalGooglePayDetails?.gpayNumber

          // this.phonepeData.id = this.withdrawalPhonePeDetails?.id;
          // this.phonepeData.name = this.withdrawalPhonePeDetails?.phonepeName;
          // this.phonepeData.phonepeNumber = this.withdrawalPhonePeDetails?.phonepeNumber;

        } else {
          const errorMessage = data?.meta?.message || 'No data received!';
        }
      });
  }

  toggleBank(value: any) {
    $('#' + value).slideToggle();
    if(this.isIconUp[value]){
      if(this.isIconUp[value]==''){
        this.isIconUp[value] = value;
      }
      else{
        this.isIconUp[value] ='';
      }
    }
    else{
      this.isIconUp[value] =value;
    }
    

  }
  toggleBank1(value: any) {
    $('#' + value).slideToggle();
    if(this.isIconUp[value]){
      if(this.isIconUp[value]==''){
        this.isIconUp[value] = value;
      }
      else{
        this.isIconUp[value] ='';
      }
    }
    else{
      this.isIconUp[value] =value;
    }

  }


  addNewBank(bankForm: any) {
    if (bankForm.valid) {
      // The form is valid, you can access the form values from the bankData object.
      // For example:
      const newBank = {
        bankName: this.bankData.bankName,
        accountNumber: this.bankData.accountNumber,
        ifsc: this.bankData.ifsc.toLocaleUpperCase(),
        accountHolderName: this.bankData.holderName,
        paymentType: 'BANK'
      };

      this.backendService.getAllRecordsByPost(CONFIG.addWithdrawalBank, newBank).then((data: any) => {
        if (data?.meta?.status) {
          this.bankData.id = '';
          this.bankData.bankName = '';
          this.bankData.accountNumber = '';
          this.bankData.ifsc = '';
          this.bankData.holderName = '';
          $('#addnew').modal('hide');
          this.toaster.success(data.meta.message, '')
          this.userWithdrawBankList();
        }
      }).catch((error: any) => {
        this.backendService.ErrorNotification_Manager(error.error)
      })

    }
  }

  addNewPaytm(paytmForm: any) {
    if (paytmForm.valid) {
      // The form is valid, you can access the form values from the bankData object.
      // For example:
      const newPaytm = {
        paytmName: this.paytmData.name,
        paytmNumber: this.paytmData.paytmNumber,
        paymentType: 'PAYTM'
      };

      // this.withdrawalPaytmDetails = newPaytm;

      this.backendService.getAllRecordsByPost(CONFIG.addWithdrawalBank, newPaytm).then((data: any) => {
        if (data?.meta?.status) {
          this.paytmData.id = '';
          this.paytmData.name = '';
          this.paytmData.paytmNumber = '';
          this.toaster.success(data.meta.message, '');
          $('#addPaytm').modal('hide');
          this.userWithdrawBankList();
        }
      }).catch((error: any) => {
        this.backendService.ErrorNotification_Manager(error.error)
      })

    }
  } 

  addNewNagad(paytmForm: any) {
    if (paytmForm.valid) {
      // The form is valid, you can access the form values from the bankData object.
      // For example:
      const newPaytm = {
        nagadName: this.paytmData.name,
        nagadNumber: this.paytmData.paytmNumber,
        paymentType: 'NAGAD'
      };

      // this.withdrawalPaytmDetails = newPaytm;

      this.backendService.getAllRecordsByPost(CONFIG.addWithdrawalBank, newPaytm).then((data: any) => {
        if (data?.meta?.status) {
          this.paytmData.id = '';
          this.paytmData.name = '';
          this.paytmData.paytmNumber = '';
          this.toaster.success(data.meta.message, '');
          $('#addNagad').modal('hide');
          this.userWithdrawBankList();
        }
      }).catch((error: any) => {
        this.backendService.ErrorNotification_Manager(error.error)
      })

    }
  } 
  addNewBkash(paytmForm: any) {
    if (paytmForm.valid) {
      // The form is valid, you can access the form values from the bankData object.
      // For example:
      const newPaytm = {
        bkashName: this.paytmData.name,
        bkashNumber: this.paytmData.paytmNumber,
        paymentType: 'BKASH'
      };

      // this.withdrawalPaytmDetails = newPaytm;

      this.backendService.getAllRecordsByPost(CONFIG.addWithdrawalBank, newPaytm).then((data: any) => {
        if (data?.meta?.status) {
          this.paytmData.id = '';
          this.paytmData.name = '';
          this.paytmData.paytmNumber = '';
          this.toaster.success(data.meta.message, '');
          $('#addBkash').modal('hide');
          this.userWithdrawBankList();
        }
      }).catch((error: any) => {
        this.backendService.ErrorNotification_Manager(error.error)
      })

    }
  } 
  addNewRocket(paytmForm: any) {
    if (paytmForm.valid) {
      // The form is valid, you can access the form values from the bankData object.
      // For example:
      const newPaytm = {
        rocketName: this.paytmData.name,
        rocketNumber: this.paytmData.paytmNumber,
        paymentType: 'ROCKET'
      };

      // this.withdrawalPaytmDetails = newPaytm;

      this.backendService.getAllRecordsByPost(CONFIG.addWithdrawalBank, newPaytm).then((data: any) => {
        if (data?.meta?.status) {
          this.paytmData.id = '';
          this.paytmData.name = '';
          this.paytmData.paytmNumber = '';
          this.toaster.success(data.meta.message, '');
          $('#addRocket').modal('hide');
          this.userWithdrawBankList();
        }
      }).catch((error: any) => {
        this.backendService.ErrorNotification_Manager(error.error)
      })

    }
  } 
  addNewGooglepay(googlepayForm: any) {
    if (googlepayForm.valid) {
      // The form is valid, you can access the form values from the bankData object.
      // For example:
      const newGooglepay = {
        gpayName: this.googlepayData.name,
        gpayNumber: this.googlepayData.gpayNumber,
        paymentType: 'GPAY'
      };
      // this.withdrawalGooglePayDetails = newGooglepay;
      // 

      this.backendService.getAllRecordsByPost(CONFIG.addWithdrawalBank, newGooglepay).then((data: any) => {
        if (data?.meta?.status) {
          this.googlepayData.id = '';
          this.googlepayData.name = '';
          this.googlepayData.gpayNumber = '';
          this.toaster.success(data.meta.message, '')
          this.userWithdrawBankList();
          $('#addGooglepay').modal('hide');
        }
      }).catch((error: any) => {
        this.backendService.ErrorNotification_Manager(error.error)
      })
     
    }
  }
 
  addNewPhonePe(phonepeForm: any) {
    if (phonepeForm.valid) {
      // The form is valid, you can access the form values from the bankData object.
      // For example:
      const newPhonePe = {
        phonepeName: this.phonepeData.name,
        phonepeNumber: this.phonepeData.phonepeNumber,
        paymentType: 'PHONEPE'
      };
      // this.withdrawalPhonePeDetails = newPhonePe;
      // 

      this.backendService.getAllRecordsByPost(CONFIG.addWithdrawalBank, newPhonePe).then((data: any) => {
        if (data?.meta?.status) {
          this.phonepeData.id = '';
          this.phonepeData.name = '';
          this.phonepeData.phonepeNumber = '';
          this.toaster.success(data.meta.message, '')
          this.userWithdrawBankList();
          $('#addPhonepe').modal('hide');
        }
      }).catch((error: any) => {
        this.backendService.ErrorNotification_Manager(error.error)
      })
    }
  }

  deleteBankDetails(id: any) {
    this.httpClient
      .post<any>(CONFIG.deleteWithdrawBank, { id })
      .pipe(
        first(),
        catchError((error) => {
          const errorMessage = error?.error?.meta?.message || 'Something went wrong.. please try again!';
          return throwError(errorMessage); // Rethrow the error to propagate it to the calling component.
        })
      )
      .subscribe((data) => {
        if (data?.meta?.status) {
          this.userWithdrawBankList();
          this.toaster.success(data.meta.message, '')
        } else {
          const errorMessage = data?.meta?.message || 'Something went wrong';
        }
      });
  }

  getDeleteItemId(id: any) {
    this.deleteItemId = id;
  }

}
