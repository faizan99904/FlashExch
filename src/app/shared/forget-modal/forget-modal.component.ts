import { Component } from '@angular/core';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-forget-modal',
  imports: [],
  templateUrl: './forget-modal.component.html',
  styleUrl: './forget-modal.component.css',
})
export class ForgetModalComponent {
  constructor(private toggle: SharedService) {}
  closePass() {
    this.toggle.hidePass();
  }
}
