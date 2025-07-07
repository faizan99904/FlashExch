import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../app/service/shared.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  havePromo: boolean = false;
  constructor(private toggle: SharedService) {}
  closeSignup() {
    this.toggle.hideSignup();
  }
}
