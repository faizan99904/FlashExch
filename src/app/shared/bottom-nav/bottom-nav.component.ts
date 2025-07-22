import { Component } from '@angular/core';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-bottom-nav',
  imports: [],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
export class BottomNavComponent {
  constructor(private sharedService: SharedService) { }
  openSidebar() {
    this.sharedService.mobileSidebarOpen();
  }
}
