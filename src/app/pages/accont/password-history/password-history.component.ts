import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { CONFIG } from '../../../../../config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-history',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './password-history.component.html',
  styleUrl: './password-history.component.css'
})
export class PasswordHistoryComponent {
  @ViewChild(DataTableDirective)
  dtTrigger: Subject<any> = new Subject<any>();
  dataTableElement!: DataTableDirective;
  dtOptions: Config = {};

  rows: any = [];

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getAccountStatement();
  }
  getAccountStatement() {

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      searching: true,
      autoWidth: false,
      order: [0, 'desc'],
      processing: false,
      ajax: (dataTablesParameters: any, callback: any) => {
        that.http
          .post<any>(
            CONFIG.changedPasswordHistory,
            Object.assign(dataTablesParameters, {})).subscribe(resp => {
              let data = resp.data?.original?.data;
              this.rows = resp.data?.original?.data;

              callback({
                recordsTotal: resp.data?.original?.recordsTotal,
                recordsFiltered: resp.data?.original?.recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'userName', orderable: false }, { data: 'remark', orderable: false }, { data: 'updatedAt', orderable: true }]
    };
  }
  rerender(): void {
    // @ts-ignore
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}
