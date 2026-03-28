import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

export interface Account {
  id: string;
  label: string;
  type: string;
  number: string;
  balance: number;
  available: number;
  opened: string;
  status: string;
  icon: string;
  frozen: boolean;
  alertThreshold: number;
}

export interface AppNotification {
  icon: 'credit' | 'debit' | 'info';
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const STORAGE_KEY = 'hackerbank_state';

const DEFAULT_ACCOUNTS: Account[] = [
  { id: 'checking', label: 'Checking ****4892', type: 'Checking', number: '****4892', balance: 12234.45, available: 11984.45, opened: '2017-03-15', status: 'Active', icon: 'C', frozen: false, alertThreshold: 500 },
  { id: 'savings', label: 'Savings ****7731', type: 'Savings', number: '****7731', balance: 48500.00, available: 48500.00, opened: '2017-03-15', status: 'Active', icon: 'S', frozen: false, alertThreshold: 1000 },
  { id: 'credit', label: 'Credit Card ****2210', type: 'Credit Card', number: '****2210', balance: -2340.80, available: 7659.20, opened: '2019-08-01', status: 'Active', icon: 'CC', frozen: false, alertThreshold: 200 }
];

const DEFAULT_TRANSACTIONS: Transaction[] = [
  { date: '2019-12-01', description: 'THE HACKERUNIVERSITY DES: CCD+ ID:0000232343', type: 0, amount: 1000, balance: '$12,234.45' },
  { date: '2019-11-25', description: 'HACKERBANK DES:DEBIT O ID: 000098794578789797987', type: 1, amount: 2450.45, balance: '$12,234.45' },
  { date: '2019-11-29', description: 'HACKERBANK DES: CREDIT O ID:1223232323', type: 1, amount: 999, balance: '$10,928.00' },
  { date: '2019-12-03', description: 'HACKERBANK INC. DES:CCD+ ID: 33375894749', type: 0, amount: 1985.4, balance: '$12,234.45' },
  { date: '2019-11-29', description: 'HACKERBANK1 BP DES: MERCH PMT ID:1358570', type: 0, amount: 1520.34, balance: '$12,234.45' },
  { date: '2019-11-29', description: 'HACKERBANK DES: DEBIT O ID:00097494729', type: 0, amount: 564, balance: '$12,234.45' },
  { date: '2019-11-30', description: 'CREDIT CARD PAYMENT ID: 222349083', type: 1, amount: 1987, balance: '$12,234.45' }
];

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  { icon: 'credit', title: 'Credit Received', message: '$1,985.40 credited to Checking ****4892', time: '2 hours ago', unread: true },
  { icon: 'debit', title: 'Debit Alert', message: '$999.00 debited from Checking ****4892', time: '1 day ago', unread: true },
  { icon: 'info', title: 'Login from new device', message: 'New login detected from Chrome on Windows', time: '2 days ago', unread: false },
  { icon: 'info', title: 'Statement Ready', message: 'Your November 2019 statement is available', time: '5 days ago', unread: false }
];

@Injectable({ providedIn: 'root' })
export class BankStateService {
  private _accounts: Account[] = [];
  private _transactions: Transaction[] = [];
  private _notifications: AppNotification[] = [];
  private _darkMode = false;

  constructor() {
    this.loadState();
    this.applyDarkMode();
  }

  private loadState(): void {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        this._accounts = saved.accounts ?? DEFAULT_ACCOUNTS.map(a => ({ ...a }));
        this._transactions = saved.transactions ?? [...DEFAULT_TRANSACTIONS];
        this._notifications = saved.notifications ?? DEFAULT_NOTIFICATIONS.map(n => ({ ...n }));
        this._darkMode = saved.darkMode ?? false;
      } catch {
        this.resetToDefaults();
      }
    } else {
      this.resetToDefaults();
    }
  }

  private resetToDefaults(): void {
    this._accounts = DEFAULT_ACCOUNTS.map(a => ({ ...a }));
    this._transactions = [...DEFAULT_TRANSACTIONS];
    this._notifications = DEFAULT_NOTIFICATIONS.map(n => ({ ...n }));
    this._darkMode = false;
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      accounts: this._accounts,
      transactions: this._transactions,
      notifications: this._notifications,
      darkMode: this._darkMode
    }));
  }

  private applyDarkMode(): void {
    document.body.classList.toggle('dark-mode', this._darkMode);
  }

  get accounts(): Account[] { return this._accounts; }
  get transactions(): Transaction[] { return this._transactions; }
  get notifications(): AppNotification[] { return this._notifications; }
  get darkMode(): boolean { return this._darkMode; }

  get checkingBalance(): number {
    return this._accounts.find(a => a.id === 'checking')?.balance ?? 0;
  }

  get unreadCount(): number {
    return this._notifications.filter(n => n.unread).length;
  }

  formatBalance(value: number): string {
    const abs = Math.abs(value);
    const formatted = abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return value < 0 ? `-$${formatted}` : `$${formatted}`;
  }

  today(): string {
    return new Date().toISOString().split('T')[0];
  }

  markRead(index: number): void {
    if (this._notifications[index]) {
      this._notifications[index].unread = false;
      this.save();
    }
  }

  markAllRead(): void {
    this._notifications.forEach(n => n.unread = false);
    this.save();
  }

  toggleDarkMode(): void {
    this._darkMode = !this._darkMode;
    this.applyDarkMode();
    this.save();
  }

  toggleFrozen(accountId: string): void {
    const acc = this._accounts.find(a => a.id === accountId);
    if (acc) {
      acc.frozen = !acc.frozen;
      acc.status = acc.frozen ? 'Frozen' : 'Active';
      this.save();
    }
  }

  setAlertThreshold(accountId: string, value: number): void {
    const acc = this._accounts.find(a => a.id === accountId);
    if (acc) {
      acc.alertThreshold = value;
      this.save();
    }
  }

  transfer(fromLabel: string, toLabel: string, amount: number, memo: string): void {
    const from = this._accounts.find(a => a.label === fromLabel);
    const to = this._accounts.find(a => a.label === toLabel);
    if (!from || !to) return;

    from.balance = parseFloat((from.balance - amount).toFixed(2));
    from.available = parseFloat((from.available - amount).toFixed(2));
    to.balance = parseFloat((to.balance + amount).toFixed(2));
    to.available = parseFloat((to.available + amount).toFixed(2));

    const desc = memo
      ? `TRANSFER TO ${to.number} - ${memo.toUpperCase()}`
      : `TRANSFER TO ${to.number}`;

    this._transactions.unshift({
      date: this.today(),
      description: desc,
      type: 1,
      amount,
      balance: this.formatBalance(from.balance)
    });

    this._notifications.unshift({
      icon: 'debit',
      title: 'Transfer Complete',
      message: `${this.formatBalance(amount)} transferred to ${to.label}`,
      time: 'Just now',
      unread: true
    });

    this.save();
  }

  makePayment(payee: string, fromLabel: string, amount: number, note: string): void {
    const from = this._accounts.find(a => a.label === fromLabel);
    if (!from) return;

    from.balance = parseFloat((from.balance - amount).toFixed(2));
    from.available = parseFloat((from.available - amount).toFixed(2));

    const desc = note
      ? `BILL PAYMENT - ${payee.toUpperCase()} - ${note.toUpperCase()}`
      : `BILL PAYMENT - ${payee.toUpperCase()}`;

    this._transactions.unshift({
      date: this.today(),
      description: desc,
      type: 1,
      amount,
      balance: this.formatBalance(from.balance)
    });

    this._notifications.unshift({
      icon: 'debit',
      title: 'Payment Scheduled',
      message: `${this.formatBalance(amount)} payment to ${payee} from ${from.number}`,
      time: 'Just now',
      unread: true
    });

    this.save();
  }
}
