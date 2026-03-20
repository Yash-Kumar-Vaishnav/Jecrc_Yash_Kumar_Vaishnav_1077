import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class ProductComponent {

  @Output() addEvent = new EventEmitter<any>();

  searchText = '';
  selectedCategory = '';

  products = [
    { id: 1, name: 'Laptop', price: 50000, category: 'Electronics' },
    { id: 2, name: 'Shoes', price: 2000, category: 'Fashion' },
    { id: 3, name: 'Phone', price: 30000, category: 'Electronics' }
  ];

  get filteredProducts() {
    return this.products.filter(p =>
      (this.selectedCategory === '' || p.category === this.selectedCategory) &&
      p.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  add(product: any) {
    this.addEvent.emit(product);
  }
}