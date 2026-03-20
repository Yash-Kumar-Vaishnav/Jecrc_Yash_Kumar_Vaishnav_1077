import { Component } from '@angular/core';
import { OrderParent } from './order-parent/order-parent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrderParent],   // 🔥 IMPORTANT
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}