import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankStateService } from '../../services/bank-state.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  payees = [
    { name: 'Electric Company', category: 'Utilities', logo: 'EC' },
    { name: 'Internet Provider', category: 'Utilities', logo: 'IP' },
    { name: 'City Water Services', category: 'Utilities', logo: 'CW' },
    { name: 'Netflix', category: 'Subscriptions', logo: 'NF' },
    { name: 'Credit Card ****2210', category: 'Credit', logo: 'CC' },
    { name: 'Mortgage Lender', category: 'Housing', logo: 'ML' }
  ];

  selectedPayee = '';
  fromAccount = '';
  amount: number | null = null;
  paymentDate = new Date().toISOString().split('T')[0];
  note = '';
  submitted = false;
  error = '';

  constructor(public state: BankStateService) {}

  get payFromAccounts() {
    return this.state.accounts.filter(a => a.id !== 'credit');
  }

  submit() {
    this.error = '';
    if (!this.selectedPayee) { this.error = 'Please select a payee.'; return; }
    if (!this.fromAccount) { this.error = 'Please select a pay-from account.'; return; }
    if (!this.amount || this.amount <= 0) { this.error = 'Enter a valid amount.'; return; }

    const acc = this.state.accounts.find(a => a.label === this.fromAccount);
    if (acc && acc.available < this.amount) { this.error = 'Insufficient available balance.'; return; }

    this.state.makePayment(this.selectedPayee, this.fromAccount, this.amount, this.note);
    this.submitted = true;
  }

  reset() {
    this.selectedPayee = '';
    this.fromAccount = '';
    this.amount = null;
    this.paymentDate = new Date().toISOString().split('T')[0];
    this.note = '';
    this.submitted = false;
    this.error = '';
  }

  selectPayee(name: string) {
    this.selectedPayee = name;
  }
}
