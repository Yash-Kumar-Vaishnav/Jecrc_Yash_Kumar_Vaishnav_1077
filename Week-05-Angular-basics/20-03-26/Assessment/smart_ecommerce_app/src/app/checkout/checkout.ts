import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {

  user = {
    name: '',
    address: '',
    email: '',
    phone: '',
    zip: '',
    gender: '',
    deliveryType: '',
    terms: false,
    subscribe: false,
    city: '',
    state: '',
    country: '',
    date: '',
    instructions: '',
    payment: ''
  };

  orderPlaced = false;
  showCard = false;
  showUpi = false;

  placeOrder() {
  this.orderPlaced = true;
  }
  paymentChange() {
    this.showCard = this.user.payment === 'card';
    this.showUpi = this.user.payment === 'upi';
  }
}