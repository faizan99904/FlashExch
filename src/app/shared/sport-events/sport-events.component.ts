import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sport-events',
  imports: [CommonModule, RouterLink],
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
