import { Component, signal } from '@angular/core';
import { Hello } from './hello/hello';
import { Home } from './home/home';
import { User } from './user/user';
import { Product } from './product/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Hello, Home, User, Product],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Component Learning');
}