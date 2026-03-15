import { Component,signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule ,HttpClient} from '@angular/common/http';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../addemployee/addemployee';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css',
  imports: [
    CommonModule,
    FormsModule,        // 🔥 Required for ngModel
    HttpClientModule,
    MatDialogModule
  ],
})
export class EmployeeDashboard {

  API = 'https://hrml-backend.vercel.app/api/employees/';
  employees = signal<any[]>([]);

  employee = {
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  };

  constructor(private http: HttpClient,private dialog: MatDialog) {}

  ngOnInit() {
    this.loadEmployees();
  }

 loadEmployees() {
  this.http.get<any[]>(this.API).subscribe({
    next: (data) => {
      this.employees.set(data); // 🔥 use .set() for signal
      console.log('Employees loaded successfully', data);
    },
    error: (err) => {
      console.error('Error loading employees', err);
      alert('Failed to load employees');
    },
    complete: () => {
      console.log('Employee API call completed');
    }
  });
}



 openAddEmployee() {

  const dialogRef = this.dialog.open(AddEmployeeComponent, {
    width: '500px'
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result?.success) {
      // ✅ If employee added successfully
      this.loadEmployees();
    }

    if (result && !result.success) {
      // ❌ If failed
      alert('Employee not added');
    }

  });

}


  deleteEmployee(id: string) {
    this.http.delete(this.API + id).subscribe(() => {
      this.loadEmployees();
    });
  }

searchText: string = '';

currentPage = 1;
itemsPerPage = 5;

get filteredEmployees() {
  const filtered = this.employees()
    .filter(emp =>
      emp.full_name?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      emp.department?.toLowerCase().includes(this.searchText.toLowerCase())
    );

  const total = Math.ceil(filtered.length / this.itemsPerPage);
  if (this.currentPage > total && total > 0) this.currentPage = 1;

  return filtered;
}

get paginatedEmployees() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredEmployees.slice(start, start + this.itemsPerPage);
}

totalPages() {
  return Math.ceil(this.filteredEmployees.length / this.itemsPerPage) || 1;
}

nextPage() {
  if (this.currentPage < this.totalPages()) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

}
