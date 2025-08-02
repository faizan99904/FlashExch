import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../../config';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { NetworkService } from '../../service/network.service';

@Component({
  selector: 'app-lottery',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.css',
})
export class LotteryComponent implements OnInit {
  loader: boolean = false;
  data: any = [];
  constructor(private backend: NetworkService) {}

  trackByFn(index: any) {
    return index;
  }

  ngOnInit(): void {
    this.lotterySportList();
  }

  lotterySportList() {
    this.loader = true;
    const payload = {
      key: '2',
    };

    this.backend.getAllRecordsByPost(CONFIG.lotterySportList, payload).then(
      (res: any) => {
        this.data = res?.data || [];
        this.loader = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
