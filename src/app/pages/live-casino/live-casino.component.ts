import { AfterViewInit, Component, effect, ElementRef, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { MainService } from '../../service/main.service';
declare var Swiper: any;

@Component({
  selector: 'app-live-casino',
  imports: [CommonModule, FooterComponent, BottomNavComponent],
  templateUrl: './live-casino.component.html',
  styleUrl: './live-casino.component.css',
})
export class LiveCasinoComponent implements AfterViewInit {
  @ViewChild('slide') elementRef!: ElementRef;
  @ViewChild('mainContainer') mainContainer!: ElementRef;

  isSearch: boolean = false;
  SeeAlFilter: any
  seeAll: boolean = false;
  activeTab: any
  casinoList: any = [];
  searchFilter: any
  filterMenuList: any
  isProvider: boolean = false;
  isDeskProvider: boolean = false;

  swiperImages = ['https://static.inpcdn.com/105,1ae716b55fe8f0.webp'];
  largeSwiperImages = ['https://static.inpcdn.com/107,1ae6fcf953adfb.webp'];

  constructor(private mainService: MainService) {
    effect(() => {
      this.casinoList = this.mainService.getCasinoEvents();
      const menu = this.casinoList?.menu || [];
      const lobby = this.casinoList?.lobby || [];
      this.filterMenu(menu, lobby);
      this.searchFilter = [...lobby];
    });
  }

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

    let width = window.innerWidth;
    this.elementRef.nativeElement.style.maxWidth = `${width}px`;
  }

  toggleSearch() {
    this.isSearch = !this.isSearch;
  }

  seeToggle(data: any, element: HTMLElement | null) {
    this.seeAll = true;
    this.SeeAlFilter = data;
    window.scrollTo({ top: 300, behavior: 'smooth' });
    if (element === null) {
      setTimeout(() => {
        const scrollTab = document.querySelector('.scrollTab') as HTMLElement;
        scrollTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }, 500);
    } else {
      element.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }



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

  filterMenu(menu: any[] | null | undefined, lobby: any[] | null | undefined) {

    const safeMenu = Array.isArray(menu) ? menu : [];
    const safeLobby = Array.isArray(lobby) ? lobby : [];

    const menuMap = new Map<string, any>();
    safeMenu.forEach(menuItem => {
      menuItem.items = [];
      menuMap.set(menuItem.menuId, menuItem);
    });

    const sortedLobby = [...safeLobby].sort((a, b) => a.sequence - b.sequence);

    sortedLobby.forEach(lobbyItem => {
      const menuId = lobbyItem.menuId;
      if (menuMap.has(menuId)) {
        menuMap.get(menuId).items.push(lobbyItem);
      }
    });

    this.filterMenuList = [...safeMenu].sort((a, b) => a.sequence - b.sequence);
  }

  searchGame(value: string) {
    if (value.length >= 1) {
      this.activeTab = null
      this.SeeAlFilter = 'all';
      this.seeAll = true;
      let inputValue = value.toLowerCase();
      this.searchFilter = [...this.casinoList.lobby].filter((item: any) => {
        return item.eventName.toLowerCase().includes(inputValue)
      })
    } else {
      this.searchFilter = [...this.casinoList.lobby]
    }
  }

  desktopFilter(menuId: any) {
    if (menuId) {
      this.activeTab = menuId
      let inputValue = menuId.toLowerCase();
      this.searchFilter = [...this.casinoList.lobby].filter((item: any) => {
        if (item.menuId == inputValue) {
          return item
        }
      })
    }
    else {
      this.searchFilter = [...this.casinoList.lobby]
    }
  }

}

