import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <span class="brand-icon">🎓</span>
        <span class="brand-name">EduSpark</span>
      </div>
      <ul class="nav-links">
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <span>🏠</span> Dashboard
          </a>
        </li>
        <li>
          <a routerLink="/courses" routerLinkActive="active">
            <span>📚</span> Courses
          </a>
        </li>
        <li>
          <a routerLink="/profile" routerLinkActive="active">
            <span>👤</span> Profile
          </a>
        </li>
      </ul>
      <div class="nav-avatar">KS</div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      height: 70px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      box-shadow: 0 2px 20px rgba(0,0,0,0.3);
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .brand-icon { font-size: 1.8rem; }

    .brand-name {
      font-size: 1.4rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: 1px;
      background: linear-gradient(90deg, #a78bfa, #60a5fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1.2rem;
      border-radius: 25px;
      color: #a0aec0;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.3s;
    }

    .nav-links a:hover {
      color: #fff;
      background: rgba(255,255,255,0.1);
    }

    .nav-links a.active {
      color: #fff;
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      box-shadow: 0 4px 15px rgba(124,58,237,0.4);
    }

    .nav-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      box-shadow: 0 0 0 3px rgba(124,58,237,0.3);
    }
  `]
})
export class Navbar {}