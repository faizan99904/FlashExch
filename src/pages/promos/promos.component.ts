import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { SportsNavComponent } from '../../shared/sports-nav/sports-nav.component';

@Component({
  selector: 'app-promos',
  imports: [FooterComponent, HeaderComponent, SportsNavComponent],
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.css',
})
export class PromosComponent {
  promos = [
    {
      img: 'https://static.inpcdn.com/121,22fc39943c2a27.webp',
      title: 'FIFA Club World Cup',
      more: 'Join FIFA Club World Cup Marathon and Win Big!',
    },
    {
      img: 'https://static.inpcdn.com/120,2324b9f459f7a7.webp',
      title: '100% Bonus!',
      more: 'Wimbledon Promo – Bet & Get 100% Free Spins!',
    },
    {
      img: 'https://static.inpcdn.com/120,22c25d8f88edbd.webp',
      title: 'Velo Marathon!',
      more: 'Weekly & Monthly Cash Prizes!',
    },
    {
      img: 'https://static.inpcdn.com/120,22978431d5f38a.webp',
      title: '3 + 1 Freebet',
      more: 'Freebet Promotion!',
    },
    {
      img: 'https://static.inpcdn.com/120,229786f485475d.webp',
      title: 'Loyalty Program',
      more: 'Velobet Cashback Offers!',
    },

    {
      img: 'https://static.inpcdn.com/120,2298c4f14a6474.webp',
      title: 'Social Media Giveaways',
      more: 'Get 10 Free Spins on Social Media!',
    },

    {
      img: 'https://static.inpcdn.com/120,22978a3dfee682.webp',
      title: 'Welcome Casino Package',
      more: 'Welcome Casino Package – Triple Your Start!',
    },
    {
      img: 'https://static.inpcdn.com/107,1ae513c94189d3.webp',
      title: 'Grand Express',
      more: 'Special Promotion for Velobet Customers!',
    },
    {
      img: 'https://static.inpcdn.com/120,22978c8d7b9e76.webp',
      title: 'Crypto Deposit Bonus',
      more: 'Welcome Crypto Deposit Bonus!',
    },
    {
      img: 'https://static.inpcdn.com/120,22978ecdf7a51e.webp',
      title: 'Sports Welcome Bonus',
      more: 'Welcome Sport Bonus!',
    },
  ];
  ismodalopen=false
  modalfunc(){
    this.ismodalopen=!this.ismodalopen
  }
  closemodal(){
    this.ismodalopen=false
  }
}
