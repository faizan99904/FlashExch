import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CONFIG } from '../../config';
import { MainService } from './service/main.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
 
  title = 'FlashExch';

  constructor( private mainService: MainService){

  }

  ngOnInit(): void {
    this.allEventsList();
    this.sportsList();
  }


  sportsList() {
    this.mainService.getDataFromServices(CONFIG.SportsList, CONFIG.SportsListTime, { key: CONFIG.siteKey }).subscribe((data: any) => {
      const filteredData = data?.data.filter((item: any) => item.sportId !== "66103");
      data.data = filteredData;
     
    });
  }
  allEventsList() {
    this.mainService.getDataFromServices(CONFIG.getAllEventsList, CONFIG.getAllEventsListTime, { key: CONFIG.siteKey }).subscribe((data: any) => {
      this.mainService.setAllEvents(data?.data);
      this.mainService.checkSports();
    });
  }
}
