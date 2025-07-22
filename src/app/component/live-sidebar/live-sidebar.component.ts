import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-live-sidebar',
  imports: [CommonModule],
  templateUrl: './live-sidebar.component.html',
  styleUrl: './live-sidebar.component.css',
})
export class LiveSidebarComponent {
  fav: boolean = true;
  soccer: boolean = true;
  tennis: boolean = true;
  cricket: boolean = true;

  toggle(title: string) {
    switch (title) {
      case 'fav':
        this.fav = !this.fav;
        break;
      case 'soccer':
        this.soccer = !this.soccer;
        break;
      case 'tennis':
        this.tennis = !this.tennis;
        break;
      case 'cricket':
        this.cricket = !this.cricket;
        break;
      default:
        break;
    }
  }
}
