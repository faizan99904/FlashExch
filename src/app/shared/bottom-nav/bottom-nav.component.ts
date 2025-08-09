import { Component } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { MobileSidebarComponent } from "../mobile-sidebar/mobile-sidebar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  imports: [MobileSidebarComponent, RouterLink],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
export class BottomNavComponent {
  constructor(private sharedService: SharedService) { }
  openSidebar() {
    this.sharedService.mobileSidebarOpen();
  }
}
