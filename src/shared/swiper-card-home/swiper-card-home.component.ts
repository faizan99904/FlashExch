import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; // Required if you're using Swiper from npm

@Component({
  selector: 'app-swiper-card-home',
  standalone: true,
  templateUrl: './swiper-card-home.component.html',
  styleUrl: './swiper-card-home.component.css'
})
export class SwiperCardHomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // const swiper = new Swiper('.swiper', {
    //   direction: 'horizontal',
    //   loop: true,
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    //   scrollbar: {
    //     el: '.swiper-scrollbar',
    //     draggable: true,
    //   },
    // });
  }
}
