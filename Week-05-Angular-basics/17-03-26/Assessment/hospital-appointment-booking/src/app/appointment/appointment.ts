import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [FormsModule],
 templateUrl: './appointment.html',
  styleUrls: ['./appointment.css']
})
export class AppointmentComponent {

  patientName = '';
  doctor = '';
  date = '';
  consultationType = '';
  symptoms = '';
  fee = 0;
  message = '';

  today = new Date().toISOString().split('T')[0];

  // Fee Logic
  calculateFee() {
    if (this.consultationType === 'Online') {
      this.fee = 300;
    } else if (this.consultationType === 'Offline') {
      this.fee = 500;
    }
  }

  // Confirmation
  bookAppointment() {
    this.message = "✅ Appointment Booked Successfully!";
  }
}