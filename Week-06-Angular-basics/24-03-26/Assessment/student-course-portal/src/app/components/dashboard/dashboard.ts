import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="dashboard">

      <!-- Hero Section -->
      <div class="hero">
        <div class="hero-text">
          <p class="hero-greeting">Good Morning 👋</p>
          <h1 class="hero-title">Welcome back, <span>Kashish!</span></h1>
          <p class="hero-sub">You have 3 courses in progress. Keep going!</p>
          <a routerLink="/courses" class="hero-btn">Browse All Courses →</a>
        </div>
        <div class="hero-visual">🎓</div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card" style="--accent: #7c3aed">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <span class="stat-num">{{ totalCourses }}</span>
            <span class="stat-label">Total Courses</span>
          </div>
        </div>
        <div class="stat-card" style="--accent: #0891b2">
          <div class="stat-icon">▶️</div>
          <div class="stat-info">
            <span class="stat-num">3</span>
            <span class="stat-label">In Progress</span>
          </div>
        </div>
        <div class="stat-card" style="--accent: #059669">
          <div class="stat-icon">✅</div>
          <div class="stat-info">
            <span class="stat-num">2</span>
            <span class="stat-label">Completed</span>
          </div>
        </div>
        <div class="stat-card" style="--accent: #d97706">
          <div class="stat-icon">🏆</div>
          <div class="stat-info">
            <span class="stat-num">5</span>
            <span class="stat-label">Certificates</span>
          </div>
        </div>
      </div>

      <!-- Featured Courses -->
      <div class="section">
        <div class="section-header">
          <h2>Featured Courses</h2>
          <a routerLink="/courses" class="see-all">See All →</a>
        </div>
        <div class="featured-grid">
          @for (course of featuredCourses; track course.id) {
            <a [routerLink]="['/course', course.id]" class="featured-card">
              <div class="fc-emoji">{{ course.image }}</div>
              <div class="fc-body">
                <span class="fc-category">{{ course.category }}</span>
                <h3>{{ course.title }}</h3>
                <p>{{ course.instructor }}</p>
                <div class="fc-meta">
                  <span>⭐ {{ course.rating }}</span>
                  <span>{{ course.duration }}</span>
                </div>
              </div>
            </a>
          }
        </div>
      </div>

    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      font-family: 'Segoe UI', sans-serif;
    }

    /* Hero */
    .hero {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
      border-radius: 24px;
      padding: 3rem;
      margin-bottom: 2rem;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      top: -50px; right: -50px;
      width: 200px; height: 200px;
      background: radial-gradient(circle, rgba(124,58,237,0.3), transparent);
      border-radius: 50%;
    }

    .hero-greeting {
      color: #a78bfa;
      font-size: 1rem;
      margin: 0 0 0.5rem;
      font-weight: 500;
    }

    .hero-title {
      font-size: 2.2rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 0.8rem;
      line-height: 1.2;
    }

    .hero-title span {
      background: linear-gradient(90deg, #a78bfa, #60a5fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-sub {
      color: #94a3b8;
      margin: 0 0 1.5rem;
    }

    .hero-btn {
      display: inline-block;
      padding: 0.75rem 1.8rem;
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      color: #fff;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      box-shadow: 0 6px 20px rgba(124,58,237,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .hero-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(124,58,237,0.5);
    }

    .hero-visual {
      font-size: 7rem;
      opacity: 0.85;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
      margin-bottom: 2.5rem;
    }

    .stat-card {
      background: #fff;
      border-radius: 18px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
      border-left: 4px solid var(--accent);
      transition: transform 0.2s;
    }

    .stat-card:hover { transform: translateY(-3px); }

    .stat-icon { font-size: 2rem; }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-num {
      font-size: 1.8rem;
      font-weight: 800;
      color: #1a1a2e;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 0.2rem;
    }

    /* Section */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.2rem;
    }

    .section-header h2 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0;
    }

    .see-all {
      color: #7c3aed;
      font-weight: 600;
      text-decoration: none;
      font-size: 0.9rem;
    }

    /* Featured Cards */
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.2rem;
    }

    .featured-card {
      background: #fff;
      border-radius: 18px;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
      transition: transform 0.25s, box-shadow 0.25s;
      display: flex;
      flex-direction: column;
    }

    .featured-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 35px rgba(0,0,0,0.12);
    }

    .fc-emoji {
      font-size: 3.5rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, #f0f4ff, #e8e0ff);
      text-align: center;
    }

    .fc-body { padding: 1.2rem; }

    .fc-category {
      background: #ede9fe;
      color: #7c3aed;
      padding: 0.25rem 0.7rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .fc-body h3 {
      font-size: 1rem;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0.6rem 0 0.3rem;
    }

    .fc-body p {
      color: #64748b;
      font-size: 0.85rem;
      margin: 0 0 0.8rem;
    }

    .fc-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
      color: #94a3b8;
      font-weight: 500;
    }
  `]
})
export class Dashboard {
  totalCourses: number;
  featuredCourses: any[];

  constructor(private courseService: CourseService) {
    this.totalCourses = this.courseService.getAllCourses().length;
    this.featuredCourses = this.courseService.getAllCourses().slice(0, 3);
  }
}