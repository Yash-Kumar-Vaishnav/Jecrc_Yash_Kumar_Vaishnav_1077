export interface Transaction {
  date: string;
  description: string;
  type: number; // 0 = Credit, 1 = Debit
  amount: number;
  balance: string;
}
