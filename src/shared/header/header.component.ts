import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private router:Router){

  }

  gotoLogin(){
    let width = window.innerWidth;
    if(width<819){
      this.router.navigateByUrl("/login")
    }
    else{
      return
    }
  }
}
