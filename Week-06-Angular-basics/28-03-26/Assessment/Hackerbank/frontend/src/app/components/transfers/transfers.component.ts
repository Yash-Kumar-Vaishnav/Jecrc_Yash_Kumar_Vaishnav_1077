import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankStateService } from '../../services/bank-state.service';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css']
})
export class TransfersComponent {
  fromAccount = '';
  toAccount = '';
  amount: number | null = null;
  memo = '';
  submitted = false;
  error = '';

  constructor(public state: BankStateService) {}

  submit() {
    this.error = '';
    if (!this.fromAccount || !this.toAccount) {
      this.error = 'Please select both accounts.';
      return;
    }
    if (this.fromAccount === this.toAccount) {
      this.error = 'From and To accounts cannot be the same.';
      return;
    }
    if (!this.amount || this.amount <= 0) {
      this.error = 'Enter a valid amount greater than 0.';
      return;
    }
    const from = this.state.accounts.find(a => a.label === this.fromAccount);
    if (from && from.available < this.amount) {
      this.error = 'Insufficient available balance.';
      return;
    }

    this.state.transfer(this.fromAccount, this.toAccount, this.amount, this.memo);
    this.submitted = true;
  }

  reset() {
    this.fromAccount = '';
    this.toAccount = '';
    this.amount = null;
    this.memo = '';
    this.submitted = false;
    this.error = '';
  }
}
