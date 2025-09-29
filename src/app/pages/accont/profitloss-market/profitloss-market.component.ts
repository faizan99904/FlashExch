import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subscription } from 'rxjs';
import { CONFIG } from '../../../../../config';
import { CommonModule, Location } from '@angular/common';


@Component({
  selector: 'app-profitloss-market',
  imports: [CommonModule, DataTablesModule, RouterLink],
  templateUrl: './profitloss-market.component.html',
  styleUrl: './profitloss-market.component.css'
})
export class ProfitlossMarketComponent {
  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
  dtOptions: Config = {};
  profitLossData: any[] = [];
  currentUserName: string = '';
  isLoader: boolean = false;
  routeSub: Subscription;
  _eventId: any;
  _sportId: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private location:Location) {
    this.routeSub = this.route.params.subscribe(params => {
      this._eventId = params['eventId'];
      this._sportId = params['sportId'];
    });
  }

  ngOnInit() {
    this.profitLossByMarket();
  }

  goBack(): void {
    this.location.back();
  }


  profitLossByMarket() {

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
            CONFIG.userMarketsProfitloss,
            Object.assign(dataTablesParameters, {
              eventId: this._eventId,
              sportId: this._sportId
            })).subscribe(resp => {

              let data = resp.data['original'].data;
              if (resp.data) {
                that.profitLossData = data;
              }

              callback({
                recordsTotal: resp.data['original'].recordsTotal,
                recordsFiltered: resp.data['original'].recordsFiltered,
                data: []
              });
            });
      },
      columns: this._sportId === '66102'
        ? [
          { data: 'sportName' },
          { data: 'eventName' },
          { data: 'marketId' },   
          { data: 'marketName' },
          { data: 'result' },
          { data: 'pl' },
          { data: 'commission' },
          { data: 'createdAt' }
        ]
        : [
          { data: 'sportName' },
          { data: 'eventName' },
          { data: 'marketName' }, 
          { data: 'result' },
          { data: 'pl' },
          { data: 'commission' },
          { data: 'createdAt' }
        ]

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
  removeQoute(result: string) {
    return result.replace(/["{}]/g, '')
  }

  ngOnDestroy() {

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

  }
}
