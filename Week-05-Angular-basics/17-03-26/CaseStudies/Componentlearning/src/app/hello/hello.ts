import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
   imports: [CommonModule],
  templateUrl: './hello.html',
  styleUrls: ['./hello.css']
})
export class Hello {
  title= "Hello Component";
}