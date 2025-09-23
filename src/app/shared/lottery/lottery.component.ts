import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../../config';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { NetworkService } from '../../service/network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lottery',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.css',
})
export class LotteryComponent implements OnInit {
  loader: boolean = false;
  data: any = [];
  constructor(private backend: NetworkService, private router: Router) {}

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
        // console.log(error);
      }
    );
  }

  lotteryDetails(game: any) {
    // console.log('game: ', game);

    this.router.navigateByUrl(
      `/lottery-details/66104/${game.eventId}`
    );
  }
}
