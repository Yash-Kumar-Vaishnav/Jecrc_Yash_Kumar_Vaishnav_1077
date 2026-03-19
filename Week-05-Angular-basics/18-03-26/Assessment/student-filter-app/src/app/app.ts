import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  students = [
    { name: 'Yash', marks: 85 },
    { name: 'Aman', marks: 45 },
    { name: 'Riya', marks: 72 },
    { name: 'Neha', marks: 30 },
    { name: 'Rahul', marks: 95 }
  ];

}