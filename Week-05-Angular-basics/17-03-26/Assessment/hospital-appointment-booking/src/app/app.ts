import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  patientName = '';
  doctor = '';
  date = '';
  consultationType = '';
  symptoms = '';

  fee = 0;
  confirmed = false;

  doctors = ['Dr. Sharma', 'Dr. Mehta', 'Dr. Gupta'];

  calculateFee() {
    this.fee = this.consultationType === 'Online' ? 300 : 500;
  }

  bookAppointment() {
    this.confirmed = true;
  }

  // disable past dates
  get today() {
    return new Date().toISOString().split('T')[0];
  }
}