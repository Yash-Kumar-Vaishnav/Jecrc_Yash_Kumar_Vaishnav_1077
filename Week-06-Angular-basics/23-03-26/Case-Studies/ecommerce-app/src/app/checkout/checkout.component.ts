import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { OrderService } from '../shared/services/order.service';
import { Order } from '../shared/models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  step = 1; // 1: Shipping, 2: Payment, 3: Confirmation
  isProcessing = false;
  placedOrder: Order | null = null;

  customerDetails = {
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  };

  cardDetails = {
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  };

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  get isShippingValid(): boolean {
    const d = this.customerDetails;
    return !!(d.customerName && d.email && d.address && d.city && d.zipCode);
  }

  get isPaymentValid(): boolean {
    if (this.customerDetails.paymentMethod === 'cod') return true;
    return !!(
      this.cardDetails.cardNumber.length >= 16 &&
      this.cardDetails.cardHolder &&
      this.cardDetails.expiry &&
      this.cardDetails.cvv.length >= 3
    );
  }

  nextStep(): void {
    if (this.step < 3) this.step++;
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    this.cardDetails.cardNumber = value.replace(/\s/g, '');
    input.value = value;
  }

  placeOrder(): void {
    if (this.isProcessing) return;
    this.isProcessing = true;

    setTimeout(() => {
      this.orderService.placeOrder(
        this.cartService.items(),
        this.getGrandTotal(),
        {
          customerName: this.customerDetails.customerName,
          email: this.customerDetails.email,
          address: this.customerDetails.address,
          city: this.customerDetails.city,
          zipCode: this.customerDetails.zipCode,
          paymentMethod: this.customerDetails.paymentMethod
        }
      ).subscribe(order => {
        this.placedOrder = order;
        this.cartService.clearCart();
        this.step = 3;
        this.isProcessing = false;
      });
    }, 1500);
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  getTax(): number {
    return Math.round(this.cartService.totalPrice() * 0.18);
  }

  getGrandTotal(): number {
    return this.cartService.totalPrice() + this.getTax();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
