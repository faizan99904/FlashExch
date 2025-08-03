import { Component, effect } from '@angular/core';
import { MainService } from '../../service/main.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inplay',
  imports: [CommonModule],
  templateUrl: './inplay.component.html',
  styleUrl: './inplay.component.css'
})
export class InplayComponent {
  inplayList: any
  constructor(private mainService: MainService) {
    effect(() => {
      this.inplayList = this.mainService.getInplayEvents();
      console.log(this.inplayList);
    })
  }
}
