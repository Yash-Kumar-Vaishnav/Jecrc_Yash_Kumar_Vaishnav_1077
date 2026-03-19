import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
   imports: [CommonModule],
  standalone: true,
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class Product {
  products = [
    {name: 'Laptop', price: 1000},
    {name: 'Phone', price: 500},
    {name: 'Tablet', price: 300},
  ];
}