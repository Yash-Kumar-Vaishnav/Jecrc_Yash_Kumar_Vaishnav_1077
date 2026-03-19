<h2>🛒 Product Order System</h2>

<input name="name" placeholder="Customer Name" [(ngModel)]="customerName">

<select name="product" [(ngModel)]="product" (change)="calculatePrice()">
  <option value="">Select Product</option>
  <option>Laptop</option>
  <option>Mobile</option>
  <option>Headphones</option>
</select>

<input name="qty" type="number" [(ngModel)]="quantity" (input)="updateTotal()">

<p>Price: ₹{{price}}</p>

<button (click)="placeOrder()">Place Order</button>

<p>{{message}}</p>

<hr>

<h3>Order Summary</h3>
<p>Name: {{customerName}}</p>
<p>Product: {{product}}</p>
<p>Quantity: {{quantity}}</p>
<p>Total: ₹{{total}}</p>