import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { SportsNavComponent } from "../../shared/sports-nav/sports-nav.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { BottomNavComponent } from "../../shared/bottom-nav/bottom-nav.component";

@Component({
  selector: 'app-minigames',
  imports: [HeaderComponent, SportsNavComponent, FooterComponent, BottomNavComponent],
  templateUrl: './minigames.component.html',
  styleUrl: './minigames.component.css'
})
export class MinigamesComponent {

}
