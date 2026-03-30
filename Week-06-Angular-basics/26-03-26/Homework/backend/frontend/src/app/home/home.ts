import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  users: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers().subscribe((res: any) => {
      this.users = res;
    });
  }

  addUser() {
    const newUser = {
      id: Date.now(),
      name: "New User"
    };

    this.api.addUser(newUser).subscribe(() => {
      this.getUsers(); // refresh list
    });
  }
}