import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-betslip',
  imports: [CommonModule, FormsModule],
  templateUrl: './betslip.component.html',
  styleUrl: './betslip.component.css',
})
export class BetslipComponent {
  stake: string = '';
  @Input() color: string = '';

  ngOnInit(): void {
    this.loginState();
  }

  login: any;

  loginState(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null && token !== '') {
      this.login = true;
    } else {
      this.login = false;
    }
    return this.login;
  }
}
