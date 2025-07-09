import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { SportsNavComponent } from "../../shared/sports-nav/sports-nav.component";

@Component({
  selector: 'app-promos',
  imports: [FooterComponent, HeaderComponent, SportsNavComponent],
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.css'
})
export class PromosComponent {

}
