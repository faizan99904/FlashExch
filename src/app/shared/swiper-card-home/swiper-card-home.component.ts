import { NgFor } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
declare var Swiper: any; // 👈️ this is required to use Swiper from CDN

@Component({
  selector: 'app-swiper-card-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './swiper-card-home.component.html',
  styleUrl: './swiper-card-home.component.css',
})
export class SwiperCardHomeComponent implements AfterViewInit {
  swiperImages: any = [
    'swiper-home/1.webp',
    'swiper-home/2.webp',
    'swiper-home/1.webp',
    'swiper-home/2.webp',
    'swiper-home/1.webp',
    'swiper-home/2.webp',
  ];

  ngAfterViewInit(): void {
    // @ts-ignore — using Swiper from CDN
    const swiper = new Swiper('.mySwiper', {
      loop: false,
      slidesPerView: 2.1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 3000, // Auto scroll every 3 seconds
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
          slidesPerView: 2.1,
        },
      },
    });
  }
}
