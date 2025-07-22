import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-change-password',
  imports: [],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }
}
