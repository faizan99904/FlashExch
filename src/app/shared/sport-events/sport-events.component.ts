import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportslistComponent } from "../sportslist/sportslist.component";
import { MarketComponent } from "../../component/market/market.component";
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-sport-events',
  imports: [CommonModule, RouterLink, SportslistComponent, MarketComponent],
  templateUrl: './sport-events.component.html',
  styleUrl: './sport-events.component.css'
})
export class SportEventsComponent {

  activeSportId:any;
  activeTab: string = 'soccer';
  isOddType:boolean = false
  searchTab:string = 'list'
  markets:any;
  constructor(private mainService:MainService){
    effect(() => {
      const id = this.mainService.getActiveSport();
      this.changeSport(id);
    });
  }
  
  selectTab(tab: any) {
    this.activeTab = tab
  }

  searchEvent(tab:any){
    this.searchTab = tab
  }

  oddToggle(){
    this.isOddType = !this.isOddType
  }
  receiveMessage(event:any){
    this.activeSportId = event;
  }

  changeSport(sportId:any){
    let allevents = this.mainService.getAllEvents();
    if(allevents){
      this.markets = allevents[sportId];
    }
   
  }
}
