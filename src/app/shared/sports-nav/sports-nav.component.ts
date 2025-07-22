import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, effect, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-sports-nav',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sports-nav.component.html',
  styleUrl: './sports-nav.component.css',
})
export class SportsNavComponent {
  activeIndex: number | null = null;

  // sportsList!: any[];

  constructor(public mainService: MainService) {
    // effect(() => {
    //   const list = this.mainService.sportsList();
    //   console.log('sportsList updated:', list);
    // });
  }

  ngOnInit() {
   
    
  }
  
}
