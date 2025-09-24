import { Component, effect, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NetworkService } from '../../service/network.service';
import { SharedService } from '../../service/shared.service';
import { CONFIG } from '../../../../config';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepositModalComponent } from "../../component/deposit-modal/deposit-modal.component";

@Component({
  selector: 'app-account-nav',
  imports: [RouterLink, CommonModule, FormsModule, DepositModalComponent],
  templateUrl: './account-nav.component.html',
  styleUrl: './account-nav.component.css',
})
export class AccountNavComponent {
  userBalance: any;
  depositAmount: any = '';
  isDeposit: boolean = false
  @ViewChild('depositInput') depositInput!: ElementRef;
  constructor(
    public networkService: NetworkService,
    public toggle: SharedService,
    private toaster: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {
    effect(() => {
      this.userBalance = this.networkService.getUserBalanceSignal()();
    });
  }

  // userLogout
  logout() {
    this.http.post(CONFIG.userLogout, {}).subscribe({
      next: (res: any) => {
        this.toaster.success(res.meta.message);
        localStorage.clear();
        this.toggle.setToken(null);
        // this.token = null
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        this.toaster.success(err.error.message)
      }
    })
  }

  toggleDeposit() {
    this.isDeposit = !this.isDeposit;

    if (this.isDeposit) {
      setTimeout(() => {
        this.depositInput?.nativeElement.focus();
      }, 500);
    }
  }

  handleEvent(value: boolean){
   this.isDeposit = value
  }

 
}
