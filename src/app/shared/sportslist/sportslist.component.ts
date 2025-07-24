import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-sportslist',
  imports: [CommonModule],
  templateUrl: './sportslist.component.html',
  styleUrl: './sportslist.component.css'
})
export class SportslistComponent {
 
  active='4'
  constructor(public mainService: MainService) {
    this.mainService.setActiveSport(this.active);
  }
  
  changeSport(sportId:any){
  this.active = sportId
  this.mainService.setActiveSport(this.active);
  }

}
