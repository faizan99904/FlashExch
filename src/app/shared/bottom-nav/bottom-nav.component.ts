import { Component, effect } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { MobileSidebarComponent } from '../mobile-sidebar/mobile-sidebar.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CONFIG } from '../../../../config';
import { NetworkService } from '../../service/network.service';
import { event } from 'jquery';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-bottom-nav',
  imports: [MobileSidebarComponent, RouterLink, CommonModule, LoaderComponent],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css',
})
export class BottomNavComponent {
  exposureData: any;
  bets: boolean = false;
  openBets: boolean = false;
  matchedBetList: any = [];
  loader: boolean = false;
  betInfo: boolean = false;

  constructor(
    private sharedService: SharedService,
    private backendService: NetworkService
  ) {
    effect(() => {
      this.exposureData = this.sharedService.getExposureData()();
      console.log('exposureData : ', this.exposureData);
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  getMatchedBetList(eventId: any, sportId: any) {
    this.openBets = !this.openBets;
    if (this.openBets === true && this.matchedBetList.length == 0) {
      this.loader = true;
      let req = {
        eventId: eventId,
        sportId: sportId,
      };
      this.backendService
        .getAllRecordsByPost(CONFIG.eventMatchedBetList, req)
        .then(
          (record: any) => {
            this.matchedBetList = record.data;
            console.log(this.matchedBetList);
            this.loader = false;
          },
          (error: any) => {}
        );
      if (this.matchedBetList.length == 0) {
        this.loader = true;
      } else {
        this.loader = false;
      }
    }
  }

  openSidebar() {
    this.sharedService.mobileSidebarOpen();
  }
}
