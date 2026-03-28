import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/record-table/record-table.component').then(m => m.RecordTableComponent)
  },
  {
    path: 'accounts',
    loadComponent: () => import('./components/accounts/accounts.component').then(m => m.AccountsComponent)
  },
  {
    path: 'transfers',
    loadComponent: () => import('./components/transfers/transfers.component').then(m => m.TransfersComponent)
  },
  {
    path: 'payments',
    loadComponent: () => import('./components/payments/payments.component').then(m => m.PaymentsComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
