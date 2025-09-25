import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
declare var Swiper: any;
@Component({
  selector: 'app-casino',
  imports: [CommonModule, FooterComponent, BottomNavComponent],
  templateUrl: './casino.component.html',
  styleUrl: './casino.component.css',
  // encapsulation: ViewEncapsulation.None
})
export class CasinoComponent {
  isSearch: boolean = false;
  seeAll: boolean = false;
  isProvider: boolean = false;
  isDeskProvider: boolean = false;
  swiperImages = [
    '/assets/images/120,2298c9285a3302.webp',
    '/assets/images/120,2298db8202d603.webp',
    '/assets/images/121,2298ed4342af83.webp',
  ];
  largeSwiperImages = [
    '/assets/images/slide2.webp',
    '/assets/images/120,2298db8202d603.webp',
    '/assets/images/121,2298ed4342af83.webp',
  ];

  deskProviders = [
    {
      img: 'https://static.inpcdn.com/117,218ddbcc73313b.webp',
      title: "Play'n GO",
    },
    {
      img: 'https://static.inpcdn.com/117,218e9eaf887dcc.webp',
      title: 'Yggdrasil',
    },
    {
      img: 'https://static.inpcdn.com/117,218e5bb8facaf1.webp',
      title: 'Thunderkick',
    },
    {
      img: 'https://static.inpcdn.com/117,218df795e48399.webp',
      title: 'EGT',
    },
    {
      img: 'https://static.inpcdn.com/117,2178a12383599c.webp',
      title: 'Gameart',
    },
    {
      img: 'https://static.inpcdn.com/119,21cba3b335cdba.webp',
      title: 'Red Rake Gaming',
    },
    {
      img: 'https://static.inpcdn.com/117,218dd472aa3746.webp',
      title: 'ORYX',
    },
    {
      img: 'https://static.inpcdn.com/117,21785db0d93a6a.webp',
      title: 'Wazdan',
    },
    {
      img: 'https://static.inpcdn.com/119,221006964ab0c1.webp',
      title: 'JFTW',
    },
    {
      img: 'https://static.inpcdn.com/118,220f5e90b438be.webp',
      title: '2BY2 Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,220fb3abda3b50.webp',
      title: 'Gamevy',
    },
    {
      img: 'https://static.inpcdn.com/119,220f8cd89270b5.webp',
      title: 'All41 Studios',
    },
    {
      img: 'https://static.inpcdn.com/119,2218d9ff74295f.webp',
      title: 'Skillzz Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,2218fae8d32305.webp',
      title: 'Golden Rock Studio',
    },
    {
      img: 'https://static.inpcdn.com/117,218ddbcc73313b.webp',
      title: "Play'n GO",
    },
    {
      img: 'https://static.inpcdn.com/117,218e9eaf887dcc.webp',
      title: 'Yggdrasil',
    },
    {
      img: 'https://static.inpcdn.com/117,218e5bb8facaf1.webp',
      title: 'Thunderkick',
    },
    {
      img: 'https://static.inpcdn.com/117,218df795e48399.webp',
      title: 'EGT',
    },
    {
      img: 'https://static.inpcdn.com/117,2178a12383599c.webp',
      title: 'Gameart',
    },
    {
      img: 'https://static.inpcdn.com/119,21cba3b335cdba.webp',
      title: 'Red Rake Gaming',
    },
    {
      img: 'https://static.inpcdn.com/117,218dd472aa3746.webp',
      title: 'ORYX',
    },
    {
      img: 'https://static.inpcdn.com/117,21785db0d93a6a.webp',
      title: 'Wazdan',
    },
    {
      img: 'https://static.inpcdn.com/119,221006964ab0c1.webp',
      title: 'JFTW',
    },
    {
      img: 'https://static.inpcdn.com/118,220f5e90b438be.webp',
      title: '2BY2 Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,220fb3abda3b50.webp',
      title: 'Gamevy',
    },
    {
      img: 'https://static.inpcdn.com/119,220f8cd89270b5.webp',
      title: 'All41 Studios',
    },
    {
      img: 'https://static.inpcdn.com/119,2218d9ff74295f.webp',
      title: 'Skillzz Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,2218fae8d32305.webp',
      title: 'Golden Rock Studio',
    },
    {
      img: 'https://static.inpcdn.com/117,218ddbcc73313b.webp',
      title: "Play'n GO",
    },
    {
      img: 'https://static.inpcdn.com/117,218e9eaf887dcc.webp',
      title: 'Yggdrasil',
    },
    {
      img: 'https://static.inpcdn.com/117,218e5bb8facaf1.webp',
      title: 'Thunderkick',
    },
    {
      img: 'https://static.inpcdn.com/117,218df795e48399.webp',
      title: 'EGT',
    },
    {
      img: 'https://static.inpcdn.com/117,2178a12383599c.webp',
      title: 'Gameart',
    },
    {
      img: 'https://static.inpcdn.com/119,21cba3b335cdba.webp',
      title: 'Red Rake Gaming',
    },
    {
      img: 'https://static.inpcdn.com/117,218dd472aa3746.webp',
      title: 'ORYX',
    },
    {
      img: 'https://static.inpcdn.com/117,21785db0d93a6a.webp',
      title: 'Wazdan',
    },
    {
      img: 'https://static.inpcdn.com/119,221006964ab0c1.webp',
      title: 'JFTW',
    },
    {
      img: 'https://static.inpcdn.com/118,220f5e90b438be.webp',
      title: '2BY2 Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,220fb3abda3b50.webp',
      title: 'Gamevy',
    },
    {
      img: 'https://static.inpcdn.com/119,220f8cd89270b5.webp',
      title: 'All41 Studios',
    },
    {
      img: 'https://static.inpcdn.com/119,2218d9ff74295f.webp',
      title: 'Skillzz Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,2218fae8d32305.webp',
      title: 'Golden Rock Studio',
    },
    {
      img: 'https://static.inpcdn.com/117,218ddbcc73313b.webp',
      title: "Play'n GO",
    },
    {
      img: 'https://static.inpcdn.com/117,218e9eaf887dcc.webp',
      title: 'Yggdrasil',
    },
    {
      img: 'https://static.inpcdn.com/117,218e5bb8facaf1.webp',
      title: 'Thunderkick',
    },
    {
      img: 'https://static.inpcdn.com/117,218df795e48399.webp',
      title: 'EGT',
    },
    {
      img: 'https://static.inpcdn.com/117,2178a12383599c.webp',
      title: 'Gameart',
    },
    {
      img: 'https://static.inpcdn.com/119,21cba3b335cdba.webp',
      title: 'Red Rake Gaming',
    },
    {
      img: 'https://static.inpcdn.com/117,218dd472aa3746.webp',
      title: 'ORYX',
    },
    {
      img: 'https://static.inpcdn.com/117,21785db0d93a6a.webp',
      title: 'Wazdan',
    },
    {
      img: 'https://static.inpcdn.com/119,221006964ab0c1.webp',
      title: 'JFTW',
    },
    {
      img: 'https://static.inpcdn.com/118,220f5e90b438be.webp',
      title: '2BY2 Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,220fb3abda3b50.webp',
      title: 'Gamevy',
    },
    {
      img: 'https://static.inpcdn.com/119,220f8cd89270b5.webp',
      title: 'All41 Studios',
    },
    {
      img: 'https://static.inpcdn.com/119,2218d9ff74295f.webp',
      title: 'Skillzz Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,2218fae8d32305.webp',
      title: 'Golden Rock Studio',
    },
    {
      img: 'https://static.inpcdn.com/117,218ddbcc73313b.webp',
      title: "Play'n GO",
    },
    {
      img: 'https://static.inpcdn.com/117,218e9eaf887dcc.webp',
      title: 'Yggdrasil',
    },
    {
      img: 'https://static.inpcdn.com/117,218e5bb8facaf1.webp',
      title: 'Thunderkick',
    },
    {
      img: 'https://static.inpcdn.com/117,218df795e48399.webp',
      title: 'EGT',
    },
    {
      img: 'https://static.inpcdn.com/117,2178a12383599c.webp',
      title: 'Gameart',
    },
    {
      img: 'https://static.inpcdn.com/119,21cba3b335cdba.webp',
      title: 'Red Rake Gaming',
    },
    {
      img: 'https://static.inpcdn.com/117,218dd472aa3746.webp',
      title: 'ORYX',
    },
    {
      img: 'https://static.inpcdn.com/117,21785db0d93a6a.webp',
      title: 'Wazdan',
    },
    {
      img: 'https://static.inpcdn.com/119,221006964ab0c1.webp',
      title: 'JFTW',
    },
    {
      img: 'https://static.inpcdn.com/118,220f5e90b438be.webp',
      title: '2BY2 Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,220fb3abda3b50.webp',
      title: 'Gamevy',
    },
    {
      img: 'https://static.inpcdn.com/119,220f8cd89270b5.webp',
      title: 'All41 Studios',
    },
    {
      img: 'https://static.inpcdn.com/119,2218d9ff74295f.webp',
      title: 'Skillzz Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,2218fae8d32305.webp',
      title: 'Golden Rock Studio',
    },
    {
      img: 'https://static.inpcdn.com/117,218ddbcc73313b.webp',
      title: "Play'n GO",
    },
    {
      img: 'https://static.inpcdn.com/117,218e9eaf887dcc.webp',
      title: 'Yggdrasil',
    },
    {
      img: 'https://static.inpcdn.com/117,218e5bb8facaf1.webp',
      title: 'Thunderkick',
    },
    {
      img: 'https://static.inpcdn.com/117,218df795e48399.webp',
      title: 'EGT',
    },
    {
      img: 'https://static.inpcdn.com/117,2178a12383599c.webp',
      title: 'Gameart',
    },
    {
      img: 'https://static.inpcdn.com/119,21cba3b335cdba.webp',
      title: 'Red Rake Gaming',
    },
    {
      img: 'https://static.inpcdn.com/117,218dd472aa3746.webp',
      title: 'ORYX',
    },
    {
      img: 'https://static.inpcdn.com/117,21785db0d93a6a.webp',
      title: 'Wazdan',
    },
    {
      img: 'https://static.inpcdn.com/119,221006964ab0c1.webp',
      title: 'JFTW',
    },
    {
      img: 'https://static.inpcdn.com/118,220f5e90b438be.webp',
      title: '2BY2 Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,220fb3abda3b50.webp',
      title: 'Gamevy',
    },
    {
      img: 'https://static.inpcdn.com/119,220f8cd89270b5.webp',
      title: 'All41 Studios',
    },
    {
      img: 'https://static.inpcdn.com/119,2218d9ff74295f.webp',
      title: 'Skillzz Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,2218fae8d32305.webp',
      title: 'Golden Rock Studio',
    },
    {
      img: 'https://static.inpcdn.com/117,218ddbcc73313b.webp',
      title: "Play'n GO",
    },
    {
      img: 'https://static.inpcdn.com/117,218e9eaf887dcc.webp',
      title: 'Yggdrasil',
    },
    {
      img: 'https://static.inpcdn.com/117,218e5bb8facaf1.webp',
      title: 'Thunderkick',
    },
    {
      img: 'https://static.inpcdn.com/117,218df795e48399.webp',
      title: 'EGT',
    },
    {
      img: 'https://static.inpcdn.com/117,2178a12383599c.webp',
      title: 'Gameart',
    },
    {
      img: 'https://static.inpcdn.com/119,21cba3b335cdba.webp',
      title: 'Red Rake Gaming',
    },
    {
      img: 'https://static.inpcdn.com/117,218dd472aa3746.webp',
      title: 'ORYX',
    },
    {
      img: 'https://static.inpcdn.com/117,21785db0d93a6a.webp',
      title: 'Wazdan',
    },
    {
      img: 'https://static.inpcdn.com/119,221006964ab0c1.webp',
      title: 'JFTW',
    },
    {
      img: 'https://static.inpcdn.com/118,220f5e90b438be.webp',
      title: '2BY2 Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,220fb3abda3b50.webp',
      title: 'Gamevy',
    },
    {
      img: 'https://static.inpcdn.com/119,220f8cd89270b5.webp',
      title: 'All41 Studios',
    },
    {
      img: 'https://static.inpcdn.com/119,2218d9ff74295f.webp',
      title: 'Skillzz Gaming',
    },
    {
      img: 'https://static.inpcdn.com/118,2218fae8d32305.webp',
      title: 'Golden Rock Studio',
    },
  ];

  ngAfterViewInit(): void {
    const swiper = new Swiper('.mySwiper', {
      loop: false,
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
