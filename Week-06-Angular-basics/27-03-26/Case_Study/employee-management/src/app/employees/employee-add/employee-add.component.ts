import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {
  employee = {
    id: 0,
    name: '',
    role: ''
  };

  constructor(private employeeService: EmployeeService, private router: Router) {}

  save(): void {
    const employees = this.employeeService.getEmployees();
    const maxId = employees.length ? Math.max(...employees.map(e => e.id)) : 0;

    this.employee.id = maxId + 1;
    this.employeeService.addEmployees({ ...this.employee });
    this.router.navigate(['/employees']);
  }

}
