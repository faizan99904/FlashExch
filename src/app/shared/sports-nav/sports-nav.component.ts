import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-sports-nav',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sports-nav.component.html',
  styleUrl: './sports-nav.component.css',
})
export class SportsNavComponent {
  activeIndex: any;

  // sportsList!: any[];

  constructor(public mainService: MainService, private router: Router) {
    effect(() => {
      this.activeIndex = this.mainService.getActiveSport();
      console.log('active', this.activeIndex);
    });
  }

  ngOnInit() {}
  changeSport(sportId: any) {
    this.mainService.setActiveSport(sportId);
  }
  navigateMarket(sportName: any, sportId: any) {
    if (sportName === 'Horse Racing' || sportName === 'Greyhound Racing') {
      this.router.navigateByUrl(`racing/${sportId}`);
    } else if (sportId === '66104') {
      this.router.navigateByUrl('lottery');
    } else {
      this.router.navigateByUrl(`competitions/${sportId}`);
    }
  }
}

// [routerLink] = "'/competitions/'+item.sportId"
