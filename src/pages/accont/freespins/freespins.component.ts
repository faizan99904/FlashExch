import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-freespins',
  imports: [CommonModule],
  templateUrl: './freespins.component.html',
  styleUrl: './freespins.component.css'
})
export class FreespinsComponent {
  tab: string = 'Freespins'

  changeTab(val: string) {
    this.tab = val
  }
}
