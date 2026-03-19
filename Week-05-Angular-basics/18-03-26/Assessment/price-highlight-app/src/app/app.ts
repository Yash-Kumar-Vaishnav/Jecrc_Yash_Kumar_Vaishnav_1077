import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceDirective } from './price';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PriceDirective],
  templateUrl: './app.html'
})
export class App {

  products = [
    { name: 'Laptop', price: 60000 },
    { name: 'Mobile', price: 20000 },
    { name: 'TV', price: 80000 }
  ];
}