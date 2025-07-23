import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SportsNavComponent } from '../../shared/sports-nav/sports-nav.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-competitions',
  imports: [
    CommonModule,
    HeaderComponent,
    SportsNavComponent,
    BottomNavComponent,
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css',
})
export class CompetitionsComponent {
  timeFilters: boolean = true;
  competitions: boolean = true;

  toggle(state: string) {
    if (state === 'time') {
      this.timeFilters = !this.timeFilters;
    } else {
      this.competitions = !this.competitions;
    }
  }
}
