import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
   imports: [CommonModule],
  standalone: true,
  templateUrl: './home.html',
   styleUrls: ['./home.css'],
})
export class Home {}