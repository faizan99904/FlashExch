import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { NetworkService } from '../../../service/network.service';
import { CONFIG } from '../../../../../config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profit-loss',
  imports: [DataTablesModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './profit-loss.component.html',
  styleUrl: './profit-loss.component.css'
})
export class ProfitLossComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  dtOptions: Config = {};
  loader: boolean = false

  public today = new Date();
  time = { hour: 13, minute: 30 };

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

  historyList: any;
  isLoader: boolean = false;
  statementList: any = [];
  selectedDataSource = '';
  reqForBets = {};
  profitLossData: any = [];
  betType = '';
  totalProfitLoss: any;

  constructor(private http: HttpClient, private router: Router, private backendService: NetworkService) {
    let todayDate = new Date()
    const yesterday = new Date(todayDate);
    yesterday.setDate(yesterday.getDate() - 1);
    this.startDate = yesterday.toISOString().slice(0, 10);
  }
  ngOnInit(): void {
    this.getProfitLoss();
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

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
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

  getProfitLoss() {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
      dataSource: this.selectedDataSource
    }
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searching: false,
      autoWidth: false,
      processing: false,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            CONFIG.userSportsProfitloss,
            Object.assign(dataTablesParameters, this.reqForBets)).subscribe(resp => {

              let data = resp.data['original'].data;
              if (resp.data) {
                that.profitLossData = data;
                // console.log('that.profitLossData ', that.profitLossData);
              }
              if (resp.total) {
                that.totalProfitLoss = resp.total;
              }
              this.loader = false
              callback({
                recordsTotal: resp.data['original'].recordsTotal,
                recordsFiltered: resp.data['original'].recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'sportName' }, { data: 'pl' }, { data: 'commission' }, { data: '', orderable: false }]
    };
  }

  rerender(): void {
    // console.log('this.startDate', this.startDate);
    if (!this.loader) {
      this.loader = true
      this.reqForBets = {
        startDate: this.backendService.getStartDate(this.startDate),
        endDate: this.backendService.getEndDate(this.endDate),
        dataSource: this.selectedDataSource
      }
      this.datatableElement.dtInstance.then((dtInstance: any) => {
        dtInstance.draw();
      });
    }

  }

  showLoading() {
    this.isLoader = true;
  }

  hideLoading() {
    this.isLoader = false;
  }

  goToEventPL(sportid: any) {
    // console.log('navigate', sportid);
    let startDate = this.backendService.getStartDate(this.startDate);
    let endDate = this.backendService.getEndDate(this.endDate);
    let url = '/account/profitloss-event/' + sportid + '/' + startDate + '/' + endDate;
    this.router.navigateByUrl(url);
  }

}
