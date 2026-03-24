import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = signal<CartItem[]>([]);

  // Computed signals
  items = computed(() => this.cartItems());
  itemCount = computed(() => this.cartItems().reduce((total, item) => total + item.quantity, 0));
  totalPrice = computed(() => this.cartItems().reduce((total, item) => total + (item.product.price * item.quantity), 0));

  addToCart(product: Product): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      this.cartItems.update(items =>
        items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.cartItems.update(items => [...items, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  isInCart(productId: number): boolean {
    return this.cartItems().some(item => item.product.id === productId);
  }

  getItemQuantity(productId: number): number {
    const item = this.cartItems().find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }
}
