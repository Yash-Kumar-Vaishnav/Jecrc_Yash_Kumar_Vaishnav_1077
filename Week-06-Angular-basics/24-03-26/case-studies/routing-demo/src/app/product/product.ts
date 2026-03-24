import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // 🔥 ADD THIS

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink], // 🔥 ADD THIS
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProduct();
  }
}