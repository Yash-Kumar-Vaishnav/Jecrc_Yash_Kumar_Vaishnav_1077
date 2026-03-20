import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderChild } from '../order-child/order-child';

@Component({
  selector: 'app-order-parent',
  standalone: true,
  imports: [CommonModule, OrderChild],
  templateUrl: './order-parent.html',
  styleUrls: ['./order-parent.css']
})
export class OrderParent {

  order = {
    id: 1,
    productName: "Laptop",
    price: 50000,
    status: "Delivered"
  };

  showChild: boolean = true;

  // 🔄 Update Order Status
  updateOrder() {
    this.order = {
      ...this.order,
      status: this.order.status === 'Pending' ? 'Delivered' : 'Pending'
    };
  }
  toggleChild() {
    this.showChild = !this.showChild;
  }

}