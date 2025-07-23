import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { NetworkService } from '../../../service/network.service';
import { CONFIG } from '../../../../../config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-statement',
  imports: [CommonModule, FormsModule, DataTablesModule],
  templateUrl: './account-statement.component.html',
  styleUrl: './account-statement.component.css'
})
export class AccountStatementComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  dtOptions: Config = {};


  reportType = '4';
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

  startDate: any;
  endDate: any = { date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() }, isRange: false, singleDate: { jsDate: new Date() } };
  reqForBets = {};
  historyList: any;
  isLoader: boolean = false;
  statementList: any = [];
  selectedDataSource = '';

  constructor(private http: HttpClient, private backendService: NetworkService) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    this.startDate = {
      date: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() - 1 },
      isRange: false,
      singleDate: { jsDate: yesterday },
    };
  }

  ngOnInit(): void {
    // this.dtOptions = {
    //   searching: false,
    //   // "dom": 'rtip'

    // };
    this.getAccountStatement()
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

  getAccountStatement() {
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
      order: [0, 'desc'],
      processing: false,
      ajax: (dataTablesParameters: any, callback) => {

        this.showLoading();
        that.http
          .post<any>(
            CONFIG.userAccountStatement,
            Object.assign(dataTablesParameters, this.reqForBets)).subscribe(resp => {

              this.hideLoading();
              let data = resp.data['original'].data;
              if (resp.data) {
                that.statementList = data;
              }

              callback({
                recordsTotal: resp.data['original'].recordsTotal,
                recordsFiltered: resp.data['original'].recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'createdAt', searchable: true, orderable: true }, { data: '', searchable: false }, { data: 'deposit', searchable: true, }, { data: 'withdraw', searchable: true }, { data: 'bankBalance', searchable: true }, { data: 'remark', searchable: true }]
    };
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

  rerender(): void {
    this.reqForBets = {
      startDate: this.backendService.getStartDate(this.startDate),
      endDate: this.backendService.getEndDate(this.endDate),
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
