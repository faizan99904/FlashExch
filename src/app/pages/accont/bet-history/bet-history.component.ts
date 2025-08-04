import { Component, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { CONFIG } from '../../../../../config';
import { Config } from 'datatables.net';
import { MainService } from '../../../service/main.service';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from '../../../service/network.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bet-history',
  imports: [CommonModule, FormsModule, DataTablesModule, RouterLink],
  templateUrl: './bet-history.component.html',
  styleUrl: './bet-history.component.css'
})
export class BetHistoryComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  dtOptions: Config = {};

  reportType = '4'
  betStatus = 'settle';
  public today = new Date();
  time = { hour: 13, minute: 30 };

  isDesktop: boolean;
  isMobile: boolean;

  currentPage = 1;
  lastPage = 1;
  pageNumber = 1;
  totalCount = 0;

  // myDpOptions: IMyDpOptions = {
  //   dateFormat: 'dd-mm-yyyy',
  //   markCurrentDay: true,
  //   monthSelector: false,
  //   showTodayBtn: false,
  //   showClearDateBtn: false,
  //   inline: false,
  //   editableDateField: false,

  //   openSelectorOnInputClick: true,
  //   disableDateRanges: [],

  //   disableUntil: { year: this.today.getFullYear(), month: this.today.getMonth(), day: this.today.getDate() - 15 },
  //   disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 }
  // };

  // startDate:any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() -1 }};
  // endDate:any= { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() }};

  startDate: any
  endDate: any = this.formatDate(this.today);


  historyList: any = [];
  isLoader: boolean = false;
  statementList: any = [];
  selectedDataSource = '';
  popularSportList: any;
  reqForBets = {};
  constructor(private mainService: MainService, private http: HttpClient, private deviceService: DeviceDetectorService, private backendService: NetworkService,) {
    let todayDate = new Date()
    const yesterday = new Date(todayDate);
    yesterday.setDate(yesterday.getDate() - 1);
    this.startDate = yesterday.toISOString().slice(0, 10);

    this.isDesktop = this.deviceService.isDesktop();
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    // console.log(' this.startDate', this.startDate)
    // console.log(' end Date', this.endDate)

    this.getBetHistoryUser();
    this.getAllSportList();

    // if (this.isMobile) {
    //   this.getBetListData();
    // }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  getAllSportList() {
    this.mainService.getDataFromServices(CONFIG.SportsList, CONFIG.SportsListTime, { key: CONFIG.siteKey }).subscribe((data: any) => {
      const filteredData = data?.data.filter((item: any) => item.sportId !== "66103");
      data.data = filteredData;

      this.popularSportList = data.data;
    })
  }

  getBetHistoryUser() {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
      sportId: this.reportType,
      flag: this.betStatus,
      dataSource: this.selectedDataSource
    }
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searching: false,
      autoWidth: false,
      order: [8, 'desc'],
      processing: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.showLoading();
        that.http
          .post<any>(
            CONFIG.userSettledBetList,
            Object.assign(dataTablesParameters, this.reqForBets)).subscribe(resp => {
              this.hideLoading();
              let data = resp.data['original'].data;
              if (resp.data) {
                that.historyList = data;
              }

              callback({
                recordsTotal: resp.data['original'].recordsTotal,
                recordsFiltered: resp.data['original'].recordsFiltered,
                data: []
              });
            });
      },

      columns: [{ data: 'sportName' }, { data: 'eventName' }, { data: 'marketName' }, { data: 'selectionName' }, { data: 'type' }
        , { data: '', orderable: false }, { data: 'stake' }, { data: 'createdAt' }, { data: 'matchedTime' }]
    };
  }


  getBetListData() {
    let apiUrl = CONFIG.userSettleBetListCustomURL;
    let data = {
      page: this.pageNumber,
      startDate: this.startDate ? moment(this.startDate.formatted).format() : moment(new Date()).format(),
      endDate: this.endDate ? moment(this.endDate.formatted).format() : moment(new Date()).format(),
      sportId: this.reportType,
      flag: this.betStatus,

    }
    if (this.betStatus === 'unsettled') {
      apiUrl = CONFIG.userUnSettleBetListCustomURL;
    }

    // this.backendService.getAllRecordsByPost(apiUrl, data)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if (data.data) {
    //         this.currentPage = data.currentPage;
    //         this.lastPage = data.lastPage;
    //         this.historyList = data.data;
    //         this.totalCount = data.count;
    //       }
    //     },
    //     error => {
    //       console.log(error)
    //     });
    this.backendService.getAllRecordsByPost(apiUrl, data)
      .then((response: any) => {
        if (response.data) {
          this.currentPage = response.currentPage;
          this.lastPage = response.lastPage;
          this.historyList = response.data;
          this.totalCount = response.count;
        }
      })
      .catch((error) => {
        console.error('Error in getAllRecordsByPost request:', error);
      });
  }


  onDateChange(event: any, type: any) {
    if (type === 'start') {
      event.singleDate = {
        jsDate:
          event.jsdate
      }
      this.startDate = event;
    } else {
      event.singleDate = {
        jsDate:
          event.jsdate
      }
      this.endDate = event;
    }
  }

  onDataSourceChange(newValue: string) {
    this.startDate = this.backendService.dateManager(newValue);
  }

  onSourceChange() {

    if (this.selectedDataSource == 'LIVE') {
      let dback = new Date();
      dback.setDate(dback.getDate() - 1);
      this.startDate = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() - 1 }, isRange: false, singleDate: { jsDate: dback } };
      this.endDate = { isRange: false, singleDate: { jsDate: new Date() } };
    }
    if (this.selectedDataSource == 'BACKUP') {
      var d = new Date();
      d.setMonth(d.getMonth() - 2);
      this.startDate = { date: { year: this.today.getFullYear(), month: this.today.getMonth() - 1, day: this.today.getDate() }, isRange: false, singleDate: { jsDate: d } };
      this.endDate = { isRange: false, singleDate: { jsDate: new Date() } };
    }
    if (this.selectedDataSource == 'OLD') {
      var d = new Date();
      d.setMonth(d.getMonth() - 12);
      this.startDate = { date: { year: this.today.getFullYear() - 1, month: this.today.getMonth() + 1, day: this.today.getDate() }, isRange: false, singleDate: { jsDate: d } };
      this.endDate = { isRange: false, singleDate: { jsDate: new Date() } };
    }
  }

  rerender(): void {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
      sportId: this.reportType,
      flag: this.betStatus,
      dataSource: this.selectedDataSource
    }
    this.datatableElement.dtInstance.then((dtInstance: any) => {
      dtInstance.draw();
    });
  }

  showLoading() {
    this.isLoader = true;
  }

  hideLoading() {
    this.isLoader = false;
  }

  
}


