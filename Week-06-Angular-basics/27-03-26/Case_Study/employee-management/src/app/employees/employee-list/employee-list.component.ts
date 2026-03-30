import { Component } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  employees : any[] = [];
  searchTerm = '';

  constructor(private service : EmployeeService){}

  ngOnInit(){
    this.employees = this.service.getEmployees();
  }

  onSearch(): void {
    this.employees = this.searchTerm.trim()
      ? this.service.searchEmployees(this.searchTerm)
      : this.service.getEmployees();
  }

  deleteEmployee(id: number): void {
    this.service.deleteEmployee(id);
    this.onSearch();
  }
}
