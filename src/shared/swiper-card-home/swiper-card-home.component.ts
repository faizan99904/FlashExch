import { NgFor } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
declare var Swiper: any; // 👈️ this is required to use Swiper from CDN

@Component({
  selector: 'app-swiper-card-home',
  standalone: true,
  imports:[NgFor],
  templateUrl: './swiper-card-home.component.html',
  styleUrl: './swiper-card-home.component.css'
})
export class SwiperCardHomeComponent implements AfterViewInit {
  swiperImages: any = ["swiper-home/1.webp", "swiper-home/2.webp", "swiper-home/1.webp", "swiper-home/2.webp", "swiper-home/1.webp", "swiper-home/2.webp"]

  ngAfterViewInit(): void {
    // @ts-ignore — ignore type issue since we use Swiper from CDN
    const swiper = new Swiper('.mySwiper', {
      loop: true, // 👈 Enables infinite looping
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    
  }
}
