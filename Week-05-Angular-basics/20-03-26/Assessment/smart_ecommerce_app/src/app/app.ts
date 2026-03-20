import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product';
import { CartComponent } from './cart/cart';
import { CheckoutComponent } from './checkout/checkout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductComponent, CartComponent, CheckoutComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  cartItems: any[] = [];

  addToCart(product: any) {
    const item = this.cartItems.find(p => p.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  increase(item: any) {
    item.quantity++;
  }

  decrease(item: any) {
    if (item.quantity > 1) item.quantity--;
  }

  remove(id: number) {
    this.cartItems = this.cartItems.filter(p => p.id !== id);
  }

  clearCart() {
    this.cartItems = [];
  }
}