import { Component, effect } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { MobileSidebarComponent } from '../mobile-sidebar/mobile-sidebar.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CONFIG } from '../../../../config';
import { NetworkService } from '../../service/network.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-bottom-nav',
  imports: [MobileSidebarComponent, RouterLink, CommonModule, LoaderComponent],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css',
})
export class BottomNavComponent {
  exposureData: any[] = [];
  bets: boolean = false;
  betInfo: boolean = false;

  constructor(
    private sharedService: SharedService,
    private backendService: NetworkService
  ) {
    effect(() => {
      this.exposureData = (this.sharedService.getExposureData()() ?? []).map(
        (item: any) => ({
          ...item,
          openBets: false,
          loader: false,
          matchedBetList: [],
        })
      );
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  toggleBet(item: any) {
    item.openBets = !item.openBets;
    if (item.openBets && item.matchedBetList.length === 0) {
      item.loader = true;
      let req = {
        eventId: item.eventId,
        sportId: item.sportId,
      };
      this.backendService
        .getAllRecordsByPost(CONFIG.eventMatchedBetList, req)
        .then(
          (record: any) => {
            item.matchedBetList = record.data;
            item.loader = false;
          },
          () => {
            item.loader = false;
          }
        );
    }
  }

  openSidebar() {
    this.sharedService.mobileSidebarOpen();
  }
}
