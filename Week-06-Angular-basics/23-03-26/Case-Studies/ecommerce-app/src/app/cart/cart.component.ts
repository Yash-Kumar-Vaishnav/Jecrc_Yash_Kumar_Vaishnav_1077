import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { CartItem } from '../shared/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(public cartService: CartService) {}

  increaseQty(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1);
  }

  decreaseQty(item: CartItem): void {
    this.cartService.updateQuantity(item.product.id, item.quantity - 1);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    if (confirm('Clear all items from cart?')) {
      this.cartService.clearCart();
    }
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  getItemTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  getTax(): number {
    return Math.round(this.cartService.totalPrice() * 0.18);
  }

  getGrandTotal(): number {
    return this.cartService.totalPrice() + this.getTax();
  }
}
