import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { CONFIG } from '../../../../../config';
import { Config } from 'datatables.net';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profitloss-event',
  imports: [CommonModule, DataTablesModule],
  templateUrl: './profitloss-event.component.html',
  styleUrl: './profitloss-event.component.css'
})
export class ProfitlossEventComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  dtOptions: Config = {};
  profitList: any[] = [];
  currentUserName: string = '';
  isLoader: boolean = false;
  routeSub: Subscription;
  _sportId: any;
  _startDate: any;
  _endDate: any;
  _dataSource: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private location: Location) {
    this.routeSub = this.route.params.subscribe(params => {
      this._sportId = params['sportId'];
      this._startDate = params['startDate'];
      this._endDate = params['endDate'];
      console.log('Sport ID:', this._sportId);
      console.log('Start Date:', this._startDate);
      console.log('End Date:', this._endDate);
    });
  }

  ngOnInit() {
    this.profitLossByEvent();
  }


  goBack(): void {
    this.location.back();
  }


  profitLossByEvent() {

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      serverSide: true,
      searching: true,
      autoWidth: false,
      // order : [0,'desc'],
      processing: false,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            CONFIG.userEventsProfitloss,
            Object.assign(dataTablesParameters, {
              startDate: this._startDate,
              sportId: this._sportId,
              endDate: this._endDate,
            })).subscribe(resp => {

              let data = resp.data['original'].data;
              if (resp.data) {
                that.profitList = data;
              }

              callback({
                recordsTotal: resp.data['original'].recordsTotal,
                recordsFiltered: resp.data['original'].recordsFiltered,
                data: []
              });
            });
      },
      columns: [{ data: 'sportName' }, { data: 'eventName' }, { data: 'pl' }, { data: 'commission' }, { data: '', orderable: false }]

    };
  }

  getPlValueFirst(pl: any) {
    let splitted = pl.split('(');
    let plFirst = splitted[0];
    return plFirst
  }

  getPlValueSecond(pl: any) {
    let splitted = pl.split('(');
    let plSecond = splitted[1] ? splitted[1].slice(0, -1) : '';
    return plSecond
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: any) => {
      dtInstance.draw();
    });
  }

  goToMarkerPL(eventid: any) {
    let url =  '/account/profitloss-market/' + eventid + '/' + this._sportId;
    this.router.navigateByUrl(url)
    return
  }

  ngOnDestroy() {

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

  }
}
