import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sport-events',
  imports: [CommonModule],
  templateUrl: './sport-events.component.html',
  styleUrl: './sport-events.component.css'
})
export class SportEventsComponent {
  activeTab: string = 'soccer';
  isOddType:boolean = false
  searchTab:string = 'list'
  selectTab(tab: any) {
    this.activeTab = tab
  }

  searchEvent(tab:any){
    this.searchTab = tab
  }

  oddToggle(){
    this.isOddType = !this.isOddType
  }

  
}
