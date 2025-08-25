import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CommonModule } from '@angular/common';
import { NetworkService } from '../../service/network.service';
import { CONFIG } from '../../../../config';

@Component({
  selector: 'app-virtual',
  imports: [CommonModule, LoaderComponent],
  templateUrl: './virtual.component.html',
  styleUrl: './virtual.component.css',
})
export class VirtualComponent implements OnInit {
  data: any = [];
  loader: boolean = false;

  trackByFn(index: any) {
    return index;
  }

  constructor(private backend: NetworkService) {}

  ngOnInit(): void {
    this.getVirtualGames();
  }

  getVirtualGames() {
    this.loader = true;
    const payload = {
      key: '1',
    };

    this.backend.getAllRecordsByPost(CONFIG.virtualSportsList, payload).then(
      (record: any) => {
        this.data = record?.data || [];
        this.loader = false;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  openGame(item: any) {
    
    this.backend.gotoMarket(item);
  }
}
