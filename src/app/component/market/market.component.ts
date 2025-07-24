import { CommonModule } from '@angular/common';
import { Component, effect, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-market',
  imports: [RouterLink, CommonModule],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css'
})
export class MarketComponent implements OnInit{
  @Input() isMobile:boolean=false;
  @Input() market:any=[];
  @Input() index:any;
  

  ngOnInit(): void {
     
  }
  getEventName(first: boolean, eventName: any) {
    let splitArray = eventName.split(' v ');
    if (first) {
      return splitArray[0];
    }
    else {
      return splitArray[1];
    }
  }
}
