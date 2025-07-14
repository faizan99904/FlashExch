import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SportsNavComponent } from '../../shared/sports-nav/sports-nav.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
declare var Swiper: any;

@Component({
  selector: 'app-live-casino',
  imports: [CommonModule, HeaderComponent, SportsNavComponent, FooterComponent],
  templateUrl: './live-casino.component.html',
  styleUrl: './live-casino.component.css',
})
export class LiveCasinoComponent implements AfterViewInit {
  @ViewChild('slide') elementRef!: ElementRef;
  isSearch: boolean = false;
  seeAll: boolean = false;
  isProvider: boolean = false;
  isDeskProvider: boolean = false;
  swiperImages = ['https://static.inpcdn.com/105,1ae716b55fe8f0.webp'];
  largeSwiperImages = ['https://static.inpcdn.com/107,1ae6fcf953adfb.webp'];

  mobItems = [
    { img: 'https://static.inpcdn.com/122,233301ff497b69.webp' },
    { img: 'https://static.inpcdn.com/122,233302776cf1c0.webp' },
    { img: 'https://static.inpcdn.com/120,23246cf83f431d.webp' },
    { img: 'https://static.inpcdn.com/122,233303f95ec97e.webp' },
    { img: 'https://static.inpcdn.com/120,23246df86c0427.webp' },
    { img: 'https://static.inpcdn.com/120,23246e2dee8840.webp' },
    { img: 'https://static.inpcdn.com/122,2333095e654702.webp' },
    { img: 'https://static.inpcdn.com/122,23331a9c187602.webp' },
    { img: 'https://static.inpcdn.com/120,232470d4173384.webp' },
    { img: 'https://static.inpcdn.com/122,2333249fbeeb8c.webp' },
    { img: 'https://static.inpcdn.com/122,23330b2240f989.webp' },
    { img: 'https://static.inpcdn.com/122,233325e1614243.webp' },
  ];

  ngAfterViewInit(): void {
    const swiper = new Swiper('.mySwiper', {
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
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

    let width = window.innerWidth;
    this.elementRef.nativeElement.style.maxWidth = `${width}px`;
  }

  toggleSearch() {
    this.isSearch = !this.isSearch;
  }

  seeToggle() {
    this.seeAll = !this.seeAll;
  }

  toggleProvider() {
    this.isProvider = !this.isProvider;
  }

  toggleDeskProvider() {
    let width = window.innerWidth;
    if (width > 1024) {
      this.isDeskProvider = !this.isDeskProvider;
    }
  }
}
