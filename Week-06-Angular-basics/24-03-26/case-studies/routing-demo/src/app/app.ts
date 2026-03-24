import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>My Angular App</h1>

    <!-- 🔹 Navbar -->
    <nav>
      <a routerLink="/home">Home</a> |
      <a routerLink="/products">Products</a> |
      <a routerLink="/contact">Contact</a>
    </nav>

    <hr>

    <!-- 🔹 Routed Components yahan load honge -->
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}