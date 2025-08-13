import { Component, effect } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';
import { NetworkService } from '../../service/network.service';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-account-nav',
  imports: [FooterComponent, RouterLink],
  templateUrl: './account-nav.component.html',
  styleUrl: './account-nav.component.css',
})
export class AccountNavComponent {
  userBalance:any
  constructor(public networkService: NetworkService, public toggle:SharedService){
    effect(() => {
      this.userBalance = this.networkService.getUserBalanceSignal()();
    });
  }
}
