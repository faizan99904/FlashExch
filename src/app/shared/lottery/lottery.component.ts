import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../../config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lottery',
  imports: [CommonModule],
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.css',
})
export class LotteryComponent implements OnInit {
  data: any = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.lotterySportList();
  }

  lotterySportList() {
    const payload = {
      key: '2',
    };

    this.http.post<any>(CONFIG.lotterySportList, payload).subscribe({
      next: (res) => {
        this.data = res?.data || [];
        console.log('data', this.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
