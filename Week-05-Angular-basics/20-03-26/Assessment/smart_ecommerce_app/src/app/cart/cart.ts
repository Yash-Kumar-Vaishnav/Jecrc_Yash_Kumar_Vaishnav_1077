import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {

  @Input() cartItems: any[] = [];

  @Output() inc = new EventEmitter<any>();
  @Output() dec = new EventEmitter<any>();
  @Output() removeEvent = new EventEmitter<number>();
  @Output() clearEvent = new EventEmitter<void>();

  getTotal() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
  }
}