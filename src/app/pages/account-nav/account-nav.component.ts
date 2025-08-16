import { Component, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NetworkService } from '../../service/network.service';
import { SharedService } from '../../service/shared.service';
import { CONFIG } from '../../../../config';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-nav',
  imports: [RouterLink],
  templateUrl: './account-nav.component.html',
  styleUrl: './account-nav.component.css',
})
export class AccountNavComponent {
  userBalance: any;
  constructor(
    public networkService: NetworkService,
    public toggle: SharedService,
    private toaster: ToastrService,
    private http: HttpClient,
    private router:Router
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
}
