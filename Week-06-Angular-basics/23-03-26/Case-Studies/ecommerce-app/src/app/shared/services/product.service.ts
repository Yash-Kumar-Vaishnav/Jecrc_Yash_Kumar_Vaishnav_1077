import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: 'Electronics',
      rating: 4.5,
      stock: 15
    },
    {
      id: 2,
      name: 'Smartwatch Pro',
      description: 'Feature-rich smartwatch with health tracking, GPS, and 7-day battery life.',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'Electronics',
      rating: 4.3,
      stock: 10
    },
    {
      id: 3,
      name: 'Running Shoes',
      description: 'Lightweight and comfortable running shoes with advanced cushioning technology.',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      category: 'Footwear',
      rating: 4.7,
      stock: 25
    },
    {
      id: 4,
      name: 'Backpack Explorer',
      description: 'Durable 40L backpack with laptop compartment, water-resistant fabric, ergonomic design.',
      price: 999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      category: 'Bags',
      rating: 4.2,
      stock: 30
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      description: '360-degree surround sound portable speaker with 20-hour playtime and waterproof design.',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      category: 'Electronics',
      rating: 4.6,
      stock: 20
    },
    {
      id: 6,
      name: 'Sunglasses UV400',
      description: 'Polarized UV400 protection sunglasses with lightweight titanium frame.',
      price: 799,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      category: 'Accessories',
      rating: 4.1,
      stock: 40
    },
    {
      id: 7,
      name: 'Yoga Mat Premium',
      description: 'Extra thick non-slip yoga mat with alignment lines, carrying strap included.',
      price: 599,
      image: 'https://images.unsplash.com/photo-1601925228957-82e1e6eff6de?w=400',
      category: 'Sports',
      rating: 4.8,
      stock: 50
    },
    {
      id: 8,
      name: 'Coffee Maker Deluxe',
      description: 'Programmable 12-cup coffee maker with built-in grinder and thermal carafe.',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      category: 'Home',
      rating: 4.4,
      stock: 12
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(p => p.category))];
    return of(['All', ...categories]);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    if (category === 'All') return of(this.products);
    return of(this.products.filter(p => p.category === category));
  }
}
