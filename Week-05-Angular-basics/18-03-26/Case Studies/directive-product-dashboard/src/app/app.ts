import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HighlightDirective], // ✅ FIX
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  protected readonly title = signal('Product Dashboard');

  showProducts = true;

  products = [
    { name: "Laptop", price: 60000, status: "available" },
    { name: "Mobile", price: 15000, status: "out" },
    { name: "Tablet", price: 25000, status: "limited" }
  ];

  toggleProducts() {
    this.showProducts = !this.showProducts;
  }
}