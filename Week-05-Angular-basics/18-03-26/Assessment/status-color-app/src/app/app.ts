import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from './status-color';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './app.html'
})
export class App {

  students = [
    { name: 'Yash', marks: 85 },
    { name: 'Aman', marks: 45 },
    { name: 'Riya', marks: 72 },
    { name: 'Neha', marks: 30 }
  ];
}