import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { BottomNavComponent } from "../../shared/bottom-nav/bottom-nav.component";

@Component({
  selector: 'app-promos',
  imports: [FooterComponent, HeaderComponent, BottomNavComponent],
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.css'
})
export class PromosComponent {

}
