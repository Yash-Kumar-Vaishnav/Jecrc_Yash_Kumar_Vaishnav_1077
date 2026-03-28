import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5000/api/transactions';

  private localData: Transaction[] = [
    { date: "2019-12-01", description: "THE HACKERUNIVERSITY DES: CCD+ ID:0000232343", type: 0, amount: 1000, balance: "$12,234.45" },
    { date: "2019-11-25", description: "HACKERBANK DES:DEBIT O ID: 000098794578789797987", type: 1, amount: 2450.45, balance: "$12,234.45" },
    { date: "2019-11-29", description: "HACKERBANK DES: CREDIT O ID:1223232323", type: 1, amount: 999, balance: "$10,928" },
    { date: "2019-12-03", description: "HACKERBANK INC. DES:CCD+ ID: 33375894749", type: 0, amount: 1985.4, balance: "$12,234.45" },
    { date: "2019-11-29", description: "HACKERBANK1 BP DES: MERCH PMT ID:1358570", type: 0, amount: 1520.34, balance: "$12,234.45" },
    { date: "2019-11-29", description: "HACKERBANK DES: DEBIT O ID:00097494729", type: 0, amount: 564, balance: "$12,234.45" },
    { date: "2019-11-30", description: "CREDIT CARD PAYMENT ID: 222349083", type: 1, amount: 1987, balance: "$12,234.45" }
  ];

  constructor(private http: HttpClient) {}

  getTransactions(date?: string, sortByAmount?: boolean): Observable<Transaction[]> {
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }
    if (sortByAmount) {
      params = params.set('sortByAmount', 'true');
    }

    return this.http.get<Transaction[]>(this.apiUrl, { params }).pipe(
      catchError(() => of(this.localData))
    );
  }

  getLocalTransactions(): Transaction[] {
    return [...this.localData];
  }
}
