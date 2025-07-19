import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-kyc',
  imports: [CommonModule],
  templateUrl: './kyc.component.html',
  styleUrl: './kyc.component.css'
})
export class KycComponent {
  identity:boolean = false;
  isVerification:boolean = false;

  showIdentity(){
    this.identity = !this.identity
  }

  showVerification(){
    this.isVerification = !this.isVerification
  }


}
