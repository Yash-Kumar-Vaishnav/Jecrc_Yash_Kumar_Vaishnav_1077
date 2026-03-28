import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankStateService, Account } from '../../services/bank-state.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  activeModal: 'statements' | 'manage' | null = null;
  selectedAccount: Account | null = null;
  editThreshold = 0;

  constructor(public state: BankStateService) {}

  get totalNetWorth(): number {
    return parseFloat(this.state.accounts.reduce((s, a) => s + a.balance, 0).toFixed(2));
  }

  openStatements(account: Account) {
    this.selectedAccount = account;
    this.activeModal = 'statements';
  }

  openManage(account: Account) {
    this.selectedAccount = account;
    this.editThreshold = account.alertThreshold;
    this.activeModal = 'manage';
  }

  closeModal() {
    this.activeModal = null;
    this.selectedAccount = null;
  }

  saveThreshold() {
    if (this.selectedAccount) {
      this.state.setAlertThreshold(this.selectedAccount.id, this.editThreshold);
      this.selectedAccount.alertThreshold = this.editThreshold;
    }
  }

  toggleFreeze() {
    if (this.selectedAccount) {
      this.state.toggleFrozen(this.selectedAccount.id);
    }
  }
}
