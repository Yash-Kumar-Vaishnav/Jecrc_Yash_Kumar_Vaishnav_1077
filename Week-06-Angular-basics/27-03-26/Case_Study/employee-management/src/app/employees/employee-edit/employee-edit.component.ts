import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent {
  employee = {
    id: 0,
    name: '',
    role: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const existing = this.employeeService.getEmployee(id);

    if (!existing) {
      this.router.navigate(['/employees']);
      return;
    }

    this.employee = { ...existing };
  }

  update(): void {
    this.employeeService.updateEmployee(this.employee);
    this.router.navigate(['/employees']);
  }

}
