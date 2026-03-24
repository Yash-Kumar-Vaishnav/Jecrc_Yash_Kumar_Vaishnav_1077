import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Courses } from './components/courses/courses';
import { CourseDetail } from './components/course-detail/course-detail';
import { Profile } from './components/profile/profile';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'courses', component: Courses },
  { path: 'course/:id', component: CourseDetail },
  { path: 'profile', component: Profile },
  { path: '**', redirectTo: 'dashboard' }
];