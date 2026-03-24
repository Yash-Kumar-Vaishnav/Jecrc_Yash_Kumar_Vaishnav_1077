import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  template: `
    @if (course) {
      <div class="detail-page">

        <!-- Back -->
        <a routerLink="/courses" class="back-btn">← Back to Courses</a>

        <!-- Hero -->
        <div class="detail-hero">
          <div class="dh-left">
            <span class="dh-cat">{{ course.category }}</span>
            <h1>{{ course.title }}</h1>
            <p class="dh-desc">{{ course.description }}</p>
            <p class="dh-instructor">👨‍🏫 Taught by <strong>{{ course.instructor }}</strong></p>
            <div class="dh-badges">
              <span class="badge">⭐ {{ course.rating }} Rating</span>
              <span class="badge">👥 {{ course.students | number }} Students</span>
              <span class="badge">⏱ {{ course.duration }}</span>
              <span class="badge" [class]="course.level.toLowerCase()">{{ course.level }}</span>
            </div>
            <div class="dh-actions">
              <button class="enroll-btn">Enroll Now — ₹{{ course.price | number }}</button>
              <button class="wishlist-btn">🤍 Wishlist</button>
            </div>
          </div>
          <div class="dh-emoji">{{ course.image }}</div>
        </div>

        <!-- What You'll Learn -->
        <div class="topics-section">
          <h2>📋 What You'll Learn</h2>
          <div class="topics-grid">
            @for (topic of course.topics; track topic) {
              <div class="topic-item">
                <span class="topic-check">✅</span>
                <span>{{ topic }}</span>
              </div>
            }
          </div>
        </div>

        <!-- More Courses -->
        <div class="more-section">
          <h2>🔥 More Courses</h2>
          <div class="more-grid">
            @for (c of moreCourses; track c.id) {
              <a [routerLink]="['/course', c.id]" class="more-card">
                <span>{{ c.image }}</span>
                <div>
                  <p class="more-title">{{ c.title }}</p>
                  <p class="more-inst">{{ c.instructor }}</p>
                </div>
                <span class="more-price">₹{{ c.price | number }}</span>
              </a>
            }
          </div>
        </div>

      </div>
    } @else {
      <div class="not-found">
        <span>🔍</span>
        <h2>Course not found!</h2>
        <a routerLink="/courses">Browse Courses</a>
      </div>
    }
  `,
  styles: [`
    .detail-page {
      padding: 2rem;
      max-width: 1100px;
      margin: 0 auto;
      font-family: 'Segoe UI', sans-serif;
    }

    .back-btn {
      display: inline-block;
      color: #7c3aed;
      font-weight: 600;
      text-decoration: none;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
      transition: gap 0.2s;
    }

    .back-btn:hover { text-decoration: underline; }

    /* Hero */
    .detail-hero {
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      border-radius: 24px;
      padding: 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2.5rem;
    }

    .dh-left { flex: 1; }

    .dh-cat {
      background: rgba(167,139,250,0.2);
      color: #a78bfa;
      padding: 0.3rem 0.9rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .dh-left h1 {
      font-size: 2rem;
      font-weight: 800;
      color: #fff;
      margin: 0.8rem 0 1rem;
      line-height: 1.2;
    }

    .dh-desc {
      color: #94a3b8;
      line-height: 1.7;
      margin: 0 0 1rem;
      font-size: 0.95rem;
    }

    .dh-instructor {
      color: #cbd5e1;
      margin: 0 0 1.2rem;
      font-size: 0.9rem;
    }

    .dh-instructor strong { color: #a78bfa; }

    .dh-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-bottom: 1.8rem;
    }

    .badge {
      background: rgba(255,255,255,0.1);
      color: #e2e8f0;
      padding: 0.35rem 0.9rem;
      border-radius: 20px;
      font-size: 0.82rem;
      font-weight: 500;
    }

    .badge.beginner { background: rgba(34,197,94,0.2); color: #86efac; }
    .badge.intermediate { background: rgba(251,191,36,0.2); color: #fcd34d; }
    .badge.advanced { background: rgba(239,68,68,0.2); color: #fca5a5; }

    .dh-actions { display: flex; gap: 1rem; }

    .enroll-btn {
      padding: 0.85rem 2rem;
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      color: #fff;
      border: none;
      border-radius: 30px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(124,58,237,0.4);
      transition: transform 0.2s;
    }

    .enroll-btn:hover { transform: translateY(-2px); }

    .wishlist-btn {
      padding: 0.85rem 1.5rem;
      background: transparent;
      color: #fff;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 30px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .wishlist-btn:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.6);
    }

    .dh-emoji {
      font-size: 8rem;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    /* Topics */
    .topics-section {
      background: #fff;
      border-radius: 20px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    }

    .topics-section h2 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0 0 1.5rem;
    }

    .topics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .topic-item {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      background: #f8fafc;
      padding: 0.9rem 1.2rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #334155;
      border: 1px solid #e2e8f0;
    }

    .topic-check { font-size: 1.1rem; }

    /* More Courses */
    .more-section { }

    .more-section h2 {
      font-size: 1.3rem;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0 0 1.2rem;
    }

    .more-grid {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .more-card {
      background: #fff;
      border-radius: 14px;
      padding: 1rem 1.3rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      transition: transform 0.2s, box-shadow 0.2s;
      font-size: 1.5rem;
    }

    .more-card:hover {
      transform: translateX(6px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    }

    .more-card div { flex: 1; }

    .more-title {
      font-weight: 700;
      color: #1a1a2e;
      margin: 0 0 0.2rem;
      font-size: 0.95rem;
    }

    .more-inst {
      color: #64748b;
      font-size: 0.82rem;
      margin: 0;
    }

    .more-price {
      font-weight: 800;
      color: #7c3aed;
      font-size: 1rem;
    }

    /* Not found */
    .not-found {
      text-align: center;
      padding: 5rem;
      font-family: 'Segoe UI', sans-serif;
    }

    .not-found span { font-size: 4rem; }
    .not-found h2 { color: #1a1a2e; margin: 1rem 0; }
    .not-found a { color: #7c3aed; font-weight: 600; }
  `]
})
export class CourseDetail implements OnInit {
  course: Course | undefined;
  moreCourses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.course = this.courseService.getCourseById(id);
      this.moreCourses = this.courseService.getAllCourses()
        .filter(c => c.id !== id)
        .slice(0, 3);
    });
  }
}