import { Component, effect } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { MobileSidebarComponent } from '../mobile-sidebar/mobile-sidebar.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CONFIG } from '../../../../config';
import { NetworkService } from '../../service/network.service';
import { LoaderComponent } from '../loader/loader.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bottom-nav',
  imports: [MobileSidebarComponent, RouterLink, CommonModule, LoaderComponent],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css',
})
export class BottomNavComponent {
  exposureData: any[] = [];
  openBetsData: any
  loader: boolean = false
  bets: boolean = false;
  betInfo: boolean = false;
  checkBoxIndex: any;
  matchedBetList:any;
  constructor(
    private sharedService: SharedService,
    private backendService: NetworkService,
    private http: HttpClient
  ) { }


  getUserEventExposure() {
    this.loader = true;
    this.openBetsData = [];
    this.http.post(CONFIG.userEventExposure, {}).subscribe({
      next: (res: any) => {
        // Apply the same transformation logic that was in the effect
        // this.exposureData = (res.data ?? []).map((item: any) => ({
        //   ...item,
        //   openBets: false,
        //   loader: false,
        //   matchedBetList: []
        // }));
        this.exposureData = res.data;
        const groupedData = {} as { [eventId: string]: any[] };
        this.exposureData.forEach((item: any) => {
          const eventId = item.eventId;
          if (!groupedData[eventId]) {
            groupedData[eventId] = [];
          }
          groupedData[eventId].push(item);
        });
        const groupedArray = Object.values(groupedData);
        this.openBetsData = groupedArray
        // console.log(this.openBetsData);
        this.loader = false;
      },
      error: (error) => {
        console.log(error);
        this.loader = false;
      },
    });
  }

  toggleBets() {
    let token = localStorage.getItem('token');
    if (!token) {
      this.sharedService.setLoginModal(true);
      return;
    }
    this.bets = !this.bets;
    if (this.bets) {
      this.getUserEventExposure()
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  toggleBet(item: any, index: number) {
    
    this.matchedBetList = [];
    if (this.checkBoxIndex == index) {
      this.checkBoxIndex = null
    } else {
      this.checkBoxIndex = index;
      this.loader = true;
    }

      let req = {
        eventId: item.eventId,
        sportId: item.sportId,
      };
      this.backendService
        .getAllRecordsByPost(CONFIG.eventMatchedBetList, req)
        .then(
          (record: any) => {
            this.matchedBetList = record.data;
            this.loader = false;
          },
          () => {
            this.loader = false;
          }
        );
    
  }

  openSidebar() {
    this.sharedService.mobileSidebarOpen();
  }




}
