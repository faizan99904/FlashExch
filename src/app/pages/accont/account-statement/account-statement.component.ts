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

  reqForBets = {};
  historyList: any;
  isLoader: boolean = false;
  statementList: any = [];
  selectedDataSource = '';
 

  startDate :any
  todayString = new Date().toISOString().slice(0,10); // "YYYY-MM-DD"
  endDate = this.todayString;

  constructor(private http: HttpClient, private backendService: NetworkService) {
    const yesterday = new Date(this.today);
    yesterday.setDate(yesterday.getDate() - 1);
    this.startDate = yesterday.toISOString().slice(0, 10);

  }

  ngOnInit(): void {
    // this.dtOptions = {
    //   searching: false,
    //   // "dom": 'rtip'

    // };
    console.log(' this.startDate', this.startDate)
    console.log(' end Date', this.endDate)
    this.getAccountStatement()
  }
  onDataSourceChange(newValue: string) {
    this.startDate = this.backendService.dateManager(newValue);
    console.log(' this.startDate', this.startDate)
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
    console.log('startDate ',this.backendService.getStartDate(this.startDate))
    console.log('startDate New',this.backendService.getStartDate(this.startDate))
    console.log('endDate',this.endDate)
    console.log('endDate New',this.backendService.getEndDate(this.endDate),)
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
