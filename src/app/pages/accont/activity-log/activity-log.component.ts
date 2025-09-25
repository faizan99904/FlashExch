import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { CONFIG } from '../../../../../config';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activity-log',
  imports: [DataTablesModule, CommonModule, RouterLink],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.css'
})
export class ActivityLogComponent {
  activityList: any
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchApi()
  }

  fetchApi() {
    this.http.post(CONFIG.userActivityLogs, {}).subscribe({
      next: (resp: any) => {
        let data = resp?.data;
        if (resp.data) {
          this.activityList = data;
        }
      }
    })
  }
}
