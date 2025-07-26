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
  profit!: number;
  editStakeMode = false;
  stakeButtonsBeforeLogin = [100, 200, 500, 1000, 2000, 5000];
  stakeButtonsAfterLogin = [1000, 2000, 5000];
  editableStakes: number[] = [];
  odds: number = 1.58;
  @Input() color: string = '';

  ngOnInit(): void {
    this.loginState();
    this.editableStakes = [...this.getCurrentStakeButtons()];
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

  addStake(amount: number): void {
    const current = parseInt(this.stake || '0', 10);
    const validCurrent = isNaN(current) ? 0 : current;
    const newStake = validCurrent + amount;
    this.stake = String(newStake);
    this.updateProfit();
  }

  updateProfit(): void {
    setTimeout(() => {
      const parsedStake = parseInt(this.stake || '0', 10);
      const validStake = isNaN(parsedStake) ? 0 : parsedStake;
      this.profit = validStake * 2;
    });
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  setMinStake(): void {
    this.stake = '100';
    this.profit = 100 * 2;
  }

  setMaxStake(): void {
    this.stake = '250000';
    this.profit = 250000 * 2;
  }

  clearStake(): void {
    this.stake = '';
    this.profit = 0;
  }

  getCurrentStakeButtons(): number[] {
    return this.login
      ? this.stakeButtonsAfterLogin
      : this.stakeButtonsBeforeLogin;
  }

  toggleEditStake(): void {
    this.editStakeMode = !this.editStakeMode;
    this.editableStakes = [...this.getCurrentStakeButtons()];
  }

  updateStake(index: number, value: number) {
    this.editableStakes[index] = value;
  }

  saveEditedStakes(): void {
    if (this.login) {
      this.stakeButtonsAfterLogin = [...this.editableStakes];
    } else {
      this.stakeButtonsBeforeLogin = [...this.editableStakes];
    }
    this.editStakeMode = false;
  }

  increaseOdds() {
    this.odds = parseFloat((this.odds + 0.01).toFixed(2));
  }

  decreaseOdds() {
    const newOdds = this.odds - 0.01;
    this.odds = newOdds > 0 ? parseFloat(newOdds.toFixed(2)) : this.odds;
  }
}
