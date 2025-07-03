import { Component } from '@angular/core';
import { SwiperCardHomeComponent } from "../../shared/swiper-card-home/swiper-card-home.component";
import { SportEventsComponent } from '../../shared/sport-events/sport-events.component';


@Component({
  selector: 'app-sports-book',
  imports: [SwiperCardHomeComponent, SportEventsComponent],
  templateUrl: './sports-book.component.html',
  styleUrl: './sports-book.component.css'
})
export class SportsBookComponent {

}
