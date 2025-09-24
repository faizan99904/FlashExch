import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-deposit-modal',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './deposit-modal.component.html',
  styleUrl: './deposit-modal.component.css'
})
export class DepositModalComponent {
  depositAmount: any = '';

  @Input() isDeposit: boolean = false;
  @Output() stateChange = new EventEmitter<boolean>();


  // allow only numbers
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
    return true;
  }

  sendFalse() {
    this.isDeposit = false;
    this.stateChange.emit(false);
  }

 
  
}
