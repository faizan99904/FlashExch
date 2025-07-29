import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-affliate',
  imports: [],
  templateUrl: './affliate.component.html',
  styleUrl: './affliate.component.css'
})
export class AffliateComponent {
  cardarr = [
    { title: 'SHARE', imgsrc: '/assets/images/affliate-page/revenue.svg' },
    { title: 'CPA', imgsrc: '/assets/images/affliate-page/cpa.svg' },
    { title: 'HYBRID', imgsrc: '/assets/images/affliate-page/hybrid.svg' },
    { title: 'SUB AFFLIATE', imgsrc: '/assets/images/affliate-page/sub.svg' },
  ]
  promarr = [
    { title: ' FIFA Club World Cup!', dsc: 'Join FIFA Club World Cup Marathon and Win Big!', src: '/assets/images/affliate-page/img-1.jpg' },
    { title: ' Super Odds!	', dsc: 'João Pedro to score and Chelsea to win', src: '/assets/images/affliate-page/img-2.webp' },
    { title: ' 100% Bonus!	', dsc: 'Wimbledon Promo – Bet & Get 100% Free Spins!', src: '/assets/images/affliate-page/img0-3.jpg' },
    { title: ' Velo Marathon!	', dsc: 'Weekly & Monthly Cash Prizes!', src: '/assets/images/affliate-page/img-4.webp' },
    { title: ' 3 + 1 Freebet', dsc: 'Freebet Promotion!', src: '/assets/images/affliate-page/img-5.webp' },
    { title: ' Loyalty Program', dsc: 'Velobet Cashback Offers!', src: '/assets/images/affliate-page/img-6.webp' },
    { title: ' Social Media Giveaways', dsc: 'Get 10 Free Spins on Social Media!', src: '/assets/images/affliate-page/img-7.webp' },
    { title: ' Welcome Casino Package ', dsc: 'Welcome Casino Package – Triple Your Start!', src: '/assets/images/affliate-page/img-8.webp' },
    { title: ' Crypto Deposit Bonus ', dsc: 'Welcome Crypto Deposit Bonus!', src: '/assets/images/affliate-page/img-9.webp' },
    { title: ' Sports Welcome Bonus ', dsc: 'Welcome Sport Bonus!', src: '/assets/images/affliate-page/img-10.webp' },
  ]
}