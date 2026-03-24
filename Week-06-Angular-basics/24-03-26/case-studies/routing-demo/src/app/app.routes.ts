import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ProductComponent } from './product/product';
import { ContactComponent } from './contact/contact';
import { ErrorComponent } from './error/error';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: ErrorComponent }
];