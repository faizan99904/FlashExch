import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TipsAndPreviewsDetailsComponent } from '../tips-and-previews-details/tips-and-previews-details.component';
import { MainService } from '../../../service/main.service';
import { CONFIG } from '../../../../../config';
import { LoaderComponent } from '../../../shared/loader/loader.component';

@Component({
  selector: 'app-tips-and-previews',
  templateUrl: './tips-and-previews.component.html',
  styleUrls: ['./tips-and-previews.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    TipsAndPreviewsDetailsComponent,
    LoaderComponent,
  ],
})
export class TipsAndPreviewsComponent implements OnInit {
  isDetailsOpen: boolean = false;
  openNews: any = {};
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.getTipsPreviewList();
  }

  tipsDataList: any;
  loader: boolean = false;
  PreviewDataList: any = [];
  getTipsPreviewList() {
    this.loader = true;
    this.mainService
      .getDataFromServices(
        CONFIG.tipsPreviewList,
        CONFIG.tipsPreviewListTime,
        {}
      )
      .subscribe((data: any) => {
        this.loader = false;
        this.tipsDataList = data.data?.tips;
        this.PreviewDataList = data.data?.preview;
      });
  }
  paragraphs: string[] = [];
  openDetails(item: any) {
    this.paragraphs = item.description.split('\n');
    this.openNews = item;
    this.openNews.paragraphs = this.paragraphs;

    this.isDetailsOpen = true;
  }
}
