import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './role';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RoleDirective],
  templateUrl: './app.html'
})
export class App {

  role = '';

  employees = [
    { name: 'Yash', salary: 50000 },
    { name: 'Aman', salary: 40000 },
    { name: 'Riya', salary: 60000 }
  ];
}