import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order, CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orders: Order[] = [];

  placeOrder(
    items: CartItem[],
    total: number,
    customerDetails: {
      customerName: string;
      email: string;
      address: string;
      city: string;
      zipCode: string;
      paymentMethod: string;
    }
  ): Observable<Order> {
    const order: Order = {
      id: this.generateOrderId(),
      items: [...items],
      total,
      ...customerDetails,
      date: new Date()
    };
    this.orders.push(order);
    return of(order);
  }

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrderById(id: string): Observable<Order | undefined> {
    return of(this.orders.find(o => o.id === id));
  }

  private generateOrderId(): string {
    return 'ORD-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  }
}
