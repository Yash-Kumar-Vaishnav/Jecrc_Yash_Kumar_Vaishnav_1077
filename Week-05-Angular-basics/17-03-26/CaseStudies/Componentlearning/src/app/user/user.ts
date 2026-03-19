import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class User {
title= "User Component";
  users = [
    "raghav",
    "sneha",
    "priya",
    "sachin"
  ];

  user = {
    name: "raghav",
    age: 25,
    city: "delhi"
  };

  get greeting() {
    return `Hello, I am ${this.user.name} from ${this.user.city}`;
  }

}