import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transactions-history',
  imports: [],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.css'
})
export class TransactionsHistoryComponent {
  constructor(private location: Location) { }
  goBack(): void {
    this.location.back();
  }
}
