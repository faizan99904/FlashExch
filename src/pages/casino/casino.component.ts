import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
declare var Swiper: any;
@Component({
  selector: 'app-casino',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './casino.component.html',
  styleUrl: './casino.component.css',
  // encapsulation: ViewEncapsulation.None
})
export class CasinoComponent {

  swiperImages = ['/assets/images/120,2298c9285a3302.webp', '/assets/images/120,2298db8202d603.webp', '/assets/images/121,2298ed4342af83.webp']
  ngAfterViewInit(): void {

    const swiper = new Swiper('.mySwiper', {
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false, // Keep autoplay after manual scroll
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
      },
    });
  }
}
