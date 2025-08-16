import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NetworkService } from '../../../service/network.service';
import { CONFIG } from '../../../../../config';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-profit-history',
  imports: [CommonModule],
  templateUrl: './profit-history.component.html',
  styleUrl: './profit-history.component.css',
})
export class ProfitHistoryComponent {
  historyList: any[] = [];

  isLoader: boolean = false;
  routeSub: Subscription;
  _sportId: any;
  _marketId: any;

  constructor(
    private route: ActivatedRoute,
    private commonService: NetworkService,
    private location: Location
  ) {
    this.routeSub = this.route.params.subscribe((params) => {
      this._sportId = params['sportId'];
      this._marketId = params['eventId'];
    });
  }

  navigateToBack() {
    this.location.back();
  }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    // this.commonService.getAllRecordsByPost(CONFIG.getUserBetList, { marketId: this._marketId, sportId: this._sportId })
    //   .pipe(first())
    //   .subscribe(
    //     data => {

    //       if (data.data) {
    //         this.historyList = data.data;
    //       }
    //     },
    //     error => {

    //       console.error('ERROR');
    //     });
    this.commonService
      .getAllRecordsByPost(CONFIG.getUserBetList, {
        marketId: this._marketId,
        sportId: this._sportId,
      })
      .then((data: any) => {
        if (data.data) {
          this.historyList = data.data;
        }
      })
      .catch((error) => {
        console.error('ERROR', error);
      });
  }

  getPlValueFirst(pl: any) {
    let splitted = pl.split('(');
    let plFirst = splitted[0];
    return plFirst;
  }

  getPlValueSecond(pl: any) {
    let splitted = pl.split('(');
    let plSecond = splitted[1] ? splitted[1].slice(0, -1) : '';
    return plSecond;
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
