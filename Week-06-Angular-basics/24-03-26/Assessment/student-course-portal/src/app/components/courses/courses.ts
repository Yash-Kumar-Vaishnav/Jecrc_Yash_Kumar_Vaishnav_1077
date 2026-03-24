import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService, Course } from '../../services/course.service';
import { DecimalPipe } from '@angular/common';
import { SlicePipe } from '@angular/common';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, FormsModule,DecimalPipe, SlicePipe],
  template: `
    <div class="courses-page">

      <div class="page-header">
        <h1>All Courses</h1>
        <p>{{ filteredCourses.length }} courses available</p>
      </div>

      <!-- Search & Filter -->
      <div class="controls">
        <div class="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search courses..."
            [(ngModel)]="searchTerm"
            (ngModelChange)="filterCourses()"
          />
        </div>
        <div class="filter-chips">
          @for (cat of categories; track cat) {
            <button
              class="chip"
              [class.active]="selectedCategory === cat"
              (click)="selectCategory(cat)"
            >{{ cat }}</button>
          }
        </div>
      </div>

      <!-- Course Grid -->
      <div class="courses-grid">
        @for (course of filteredCourses; track course.id) {
          <a [routerLink]="['/course', course.id]" class="course-card">
            <div class="card-top">
              <span class="card-emoji">{{ course.image }}</span>
              <span class="card-level" [class]="course.level.toLowerCase()">{{ course.level }}</span>
            </div>
            <div class="card-body">
              <span class="card-cat">{{ course.category }}</span>
              <h3>{{ course.title }}</h3>
              <p class="card-instructor">👨‍🏫 {{ course.instructor }}</p>
              <p class="card-desc">{{ course.description | slice:0:90 }}...</p>
              <div class="card-stats">
                <span>⭐ {{ course.rating }}</span>
                <span>👥 {{ course.students | number }}</span>
                <span>⏱ {{ course.duration }}</span>
              </div>
              <div class="card-footer">
                <span class="card-price">₹{{ course.price | number }}</span>
                <span class="card-cta">View Details →</span>
              </div>
            </div>
          </a>
        }

        @if (filteredCourses.length === 0) {
          <div class="empty-state">
            <span>😔</span>
            <p>No courses found. Try a different search.</p>
          </div>
        }
      </div>

    </div>
  `,
  styles: [`
    .courses-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      font-family: 'Segoe UI', sans-serif;
    }

    .page-header {
      margin-bottom: 1.5rem;
    }

    .page-header h1 {
      font-size: 2rem;
      font-weight: 800;
      color: #1a1a2e;
      margin: 0 0 0.3rem;
    }

    .page-header p {
      color: #64748b;
      margin: 0;
    }

    /* Controls */
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      margin-bottom: 2rem;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      background: #fff;
      border: 2px solid #e2e8f0;
      border-radius: 30px;
      padding: 0.6rem 1.2rem;
      flex: 1;
      min-width: 220px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      transition: border-color 0.2s;
    }

    .search-box:focus-within {
      border-color: #7c3aed;
    }

    .search-box input {
      border: none;
      outline: none;
      font-size: 0.95rem;
      width: 100%;
      background: transparent;
      color: #1a1a2e;
    }

    .filter-chips {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .chip {
      padding: 0.45rem 1.1rem;
      border-radius: 25px;
      border: 2px solid #e2e8f0;
      background: #fff;
      color: #64748b;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .chip:hover {
      border-color: #7c3aed;
      color: #7c3aed;
    }

    .chip.active {
      background: linear-gradient(135deg, #7c3aed, #2563eb);
      border-color: transparent;
      color: #fff;
    }

    /* Grid */
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .course-card {
      background: #fff;
      border-radius: 20px;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 4px 20px rgba(0,0,0,0.07);
      transition: transform 0.25s, box-shadow 0.25s;
      display: flex;
      flex-direction: column;
    }

    .course-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.13);
    }

    .card-top {
      background: linear-gradient(135deg, #f0f4ff, #ede9fe);
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-emoji { font-size: 3rem; }

    .card-level {
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .card-level.beginner { background: #dcfce7; color: #16a34a; }
    .card-level.intermediate { background: #fef3c7; color: #d97706; }
    .card-level.advanced { background: #fee2e2; color: #dc2626; }

    .card-body { padding: 1.3rem; flex: 1; display: flex; flex-direction: column; }

    .card-cat {
      background: #ede9fe;
      color: #7c3aed;
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-size: 0.72rem;
      font-weight: 600;
    }

    .card-body h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: #1a1a2e;
      margin: 0.6rem 0 0.3rem;
    }

    .card-instructor {
      color: #64748b;
      font-size: 0.85rem;
      margin: 0 0 0.5rem;
    }

    .card-desc {
      color: #94a3b8;
      font-size: 0.83rem;
      line-height: 1.5;
      margin: 0 0 1rem;
      flex: 1;
    }

    .card-stats {
      display: flex;
      gap: 1rem;
      font-size: 0.82rem;
      color: #64748b;
      margin-bottom: 1rem;
      padding: 0.7rem;
      background: #f8fafc;
      border-radius: 10px;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-price {
      font-size: 1.2rem;
      font-weight: 800;
      color: #1a1a2e;
    }

    .card-cta {
      color: #7c3aed;
      font-weight: 600;
      font-size: 0.85rem;
    }

    .empty-state {
      grid-column: 1/-1;
      text-align: center;
      padding: 4rem;
      color: #94a3b8;
    }

    .empty-state span { font-size: 3rem; }
    .empty-state p { margin-top: 1rem; font-size: 1.1rem; }
  `]
})
export class Courses {
  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm = '';
  selectedCategory = 'All';
  categories = ['All', 'Web Dev', 'Data Science', 'Design', 'Cloud', 'Mobile', 'Security'];

  constructor(private courseService: CourseService) {
    this.allCourses = this.courseService.getAllCourses();
    this.filteredCourses = this.allCourses;
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.filterCourses();
  }

  filterCourses() {
    let result = this.allCourses;
    if (this.selectedCategory !== 'All') {
      result = result.filter(c => c.category === this.selectedCategory);
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(term) ||
        c.instructor.toLowerCase().includes(term) ||
        c.category.toLowerCase().includes(term)
      );
    }
    this.filteredCourses = result;
  }
}