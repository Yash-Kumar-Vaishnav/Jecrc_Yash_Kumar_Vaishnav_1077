import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="profile-page">

      <!-- Profile Card -->
      <div class="profile-hero">
        <div class="avatar-ring">
          <div class="avatar">KS</div>
        </div>
        <div class="profile-info">
          <h1>Kashish Singh</h1>
          <p class="profile-email">📧 kashish.rastogi&#64;eduspark.com</p>
          <p class="profile-batch">🎓 Batch 2024 — Full Stack Track</p>
          <div class="profile-tags">
            <span>Angular</span>
            <span>.NET</span>
            <span>SQL Server</span>
            <span>JWT Auth</span>
          </div>
        </div>
        <div class="profile-score">
          <div class="score-circle">
            <span class="score-num">87</span>
            <span class="score-label">Score</span>
          </div>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="pstats-row">
        <div class="pstat">
          <span class="pstat-val">{{ totalCourses }}</span>
          <span class="pstat-label">Enrolled</span>
        </div>
        <div class="pstat">
          <span class="pstat-val">2</span>
          <span class="pstat-label">Completed</span>
        </div>
        <div class="pstat">
          <span class="pstat-val">142</span>
          <span class="pstat-label">Hours Learned</span>
        </div>
        <div class="pstat">
          <span class="pstat-val">5</span>
          <span class="pstat-label">Certificates</span>
        </div>
      </div>

      <div class="profile-grid">

        <!-- Enrolled Courses -->
        <div class="profile-card">
          <h2>📚 My Enrolled Courses</h2>
          @for (course of enrolledCourses; track course.id) {
            <a [routerLink]="['/course', course.id]" class="enrolled-item">
              <span class="ei-emoji">{{ course.image }}</span>
              <div class="ei-info">
                <p class="ei-title">{{ course.title }}</p>
                <div class="progress-bar">
                  <div class="progress-fill" [style.width]="getProgress(course.id) + '%'"></div>
                </div>
                <span class="ei-progress">{{ getProgress(course.id) }}% complete</span>
              </div>
              <span class="ei-arrow">→</span>
            </a>
          }
        </div>

        <!-- Info Card -->
        <div class="info-col">
          <div class="profile-card">
            <h2>👤 Personal Info</h2>
            <div class="info-list">
              <div class="info-row">
                <span class="info-key">Full Name</span>
                <span class="info-val">Kashish Rastogi</span>
              </div>
              <div class="info-row">
                <span class="info-key">Email</span>
                <span class="info-val">kashish&#64;eduspark.com</span>
              </div>
              <div class="info-row">
                <span class="info-key">Phone</span>
                <span class="info-val">+91 98765 43210</span>
              </div>
              <div class="info-row">
                <span class="info-key">Location</span>
                <span class="info-val">Mumbai, India</span>
              </div>
              <div class="info-row">
                <span class="info-key">Joined</span>
                <span class="info-val">Jan 2024</span>
              </div>
            </div>
          </div>

          <div class="profile-card">
            <h2>🏆 Achievements</h2>
            <div class="achievements">
              <div class="ach-item">🥇 <span>First Course Completed</span></div>
              <div class="ach-item">🔥 <span>7-Day Streak</span></div>
              <div class="ach-item">⭐ <span>Top Performer</span></div>
              <div class="ach-item">💡 <span>Quiz Master</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .profile-page {
      padding: 2rem;
      max-width: 1100px;
      margin: 0 auto;
      font-family: 'Segoe UI', sans-serif;
    }

    /* Hero */
    .profile-hero {
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      border-radius: 24px;
      padding: 2.5rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 1.5rem;
    }

    .avatar-ring {
      padding: 4px;
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      border-radius: 50%;
    }

    .avatar {
      width: 90px;
      height: 90px;
      background: #1a1a2e;
      border-radius: 50%;
      color: #a78bfa;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: 800;
    }

    .profile-info { flex: 1; }

    .profile-info h1 {
      color: #fff;
      font-size: 1.8rem;
      font-weight: 800;
      margin: 0 0 0.4rem;
    }

    .profile-email, .profile-batch {
      color: #94a3b8;
      margin: 0.2rem 0;
      font-size: 0.9rem;
    }

    .profile-tags {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.8rem;
      flex-wrap: wrap;
    }

    .profile-tags span {
      background: rgba(124,58,237,0.2);
      color: #a78bfa;
      padding: 0.25rem 0.7rem;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 600;
    }

    .profile-score { text-align: center; }

    .score-circle {
      width: 90px;
      height: 90px;
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 30px rgba(124,58,237,0.4);
    }

    .score-num {
      font-size: 1.8rem;
      font-weight: 800;
      color: #fff;
      line-height: 1;
    }

    .score-label {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.7);
    }

    /* Stats Row */
    .pstats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .pstat {
      background: #fff;
      border-radius: 16px;
      padding: 1.2rem;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.06);
    }

    .pstat-val {
      display: block;
      font-size: 1.8rem;
      font-weight: 800;
      color: #7c3aed;
    }

    .pstat-label {
      font-size: 0.8rem;
      color: #64748b;
    }

    /* Grid */
    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 1.5rem;
    }

    .info-col { display: flex; flex-direction: column; gap: 1.5rem; }

    .profile-card {
      background: #fff;
      border-radius: 20px;
      padding: 1.8rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
    }

    .profile-card h2 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0 0 1.3rem;
    }

    /* Enrolled */
    .enrolled-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #f1f5f9;
      text-decoration: none;
      color: inherit;
      transition: padding-left 0.2s;
    }

    .enrolled-item:last-child { border-bottom: none; }
    .enrolled-item:hover { padding-left: 6px; }

    .ei-emoji { font-size: 2rem; }
    .ei-info { flex: 1; }

    .ei-title {
      font-weight: 600;
      color: #1a1a2e;
      font-size: 0.9rem;
      margin: 0 0 0.5rem;
    }

    .progress-bar {
      background: #f1f5f9;
      border-radius: 10px;
      height: 6px;
      margin-bottom: 0.3rem;
    }

    .progress-fill {
      background: linear-gradient(90deg, #7c3aed, #2563eb);
      border-radius: 10px;
      height: 100%;
      transition: width 0.5s;
    }

    .ei-progress {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    .ei-arrow { color: #7c3aed; font-weight: 700; }

    /* Info List */
    .info-list { display: flex; flex-direction: column; gap: 0.8rem; }

    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 0.6rem 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .info-row:last-child { border-bottom: none; }

    .info-key {
      color: #94a3b8;
      font-size: 0.85rem;
    }

    .info-val {
      color: #1a1a2e;
      font-size: 0.85rem;
      font-weight: 600;
    }

    /* Achievements */
    .achievements { display: flex; flex-direction: column; gap: 0.7rem; }

    .ach-item {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      padding: 0.7rem 1rem;
      background: #f8fafc;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #334155;
    }
  `]
})
export class Profile {
  totalCourses: number;
  enrolledCourses: any[];
  private progressMap: { [id: number]: number } = { 1: 75, 2: 40, 5: 20 };

  constructor(private courseService: CourseService) {
    this.totalCourses = 3;
    this.enrolledCourses = this.courseService.getAllCourses()
      .filter(c => [1, 2, 5].includes(c.id));
  }

  getProgress(id: number): number {
    return this.progressMap[id] || 0;
  }
}