import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { BankStateService } from '../../services/bank-state.service';

@Component({
  selector: 'app-record-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.css']
})
export class RecordTableComponent implements OnInit {
  allTransactions: Transaction[] = [];
  displayedTransactions: Transaction[] = [];
  selectedDate: string = '';

  constructor(private state: BankStateService) {}

  ngOnInit(): void {
    this.allTransactions = this.getTransactions();
    this.displayedTransactions = [...this.allTransactions];
  }

  getTransactions(): Transaction[] {
    return this.state.transactions;
  }

  filterByDate(): void {
    if (!this.selectedDate) {
      return;
    }
    this.displayedTransactions = this.allTransactions.filter(
      (t) => t.date === this.selectedDate
    );
  }

  resetFilter(): void {
    this.selectedDate = '';
    this.allTransactions = this.getTransactions();
    this.displayedTransactions = [...this.allTransactions];
  }

  sortByAmount(): void {
    this.displayedTransactions = [...this.displayedTransactions].sort(
      (a, b) => a.amount - b.amount
    );
  }

  getTypeLabel(type: number): string {
    return type === 0 ? 'Credit' : 'Debit';
  }

  get checkingBalance(): string {
    return this.state.formatBalance(this.state.checkingBalance);
  }
}
