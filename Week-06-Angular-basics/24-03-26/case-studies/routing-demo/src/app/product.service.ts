import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  // Get all products
  getProduct(): Product[] {
    return [
      new Product(1, 'Laptop', 999.99),
      new Product(2, 'Smartphone', 499.99),
      new Product(3, 'Headphones', 199.99)
    ];
  }

  // Get product by ID
  getProductById(id: number): Product | undefined {
  return this.getProduct().find(product => product.productID === id);
}
}