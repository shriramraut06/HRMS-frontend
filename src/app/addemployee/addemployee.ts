import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addemployee.html',
  styleUrls: ['./addemployee.css']
})
export class AddEmployeeComponent {

  employeeForm!: FormGroup;   // 🔥 Declare first
  constructor(private fb: FormBuilder,
  private http: HttpClient,
  private dialogRef: MatDialogRef<AddEmployeeComponent>
  ) {

    // 🔥 Initialize inside constructor
    this.employeeForm = this.fb.group({
      employee_id: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]],
      full_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')
      ]],
      department: ['', Validators.required]
    });

  }

  addEmployee() {
  if (this.employeeForm.valid) {

    const employeeData = this.employeeForm.value;

    this.http.post('http://127.0.0.1:8000/api/employees/', employeeData)
      .subscribe({
        next: (res) => {
          this.dialogRef.close({
            success: true,
            data: res
          });
        },
        error: (err) => {
          this.dialogRef.close({
            success: false,
            error: err
          });
        }
      });

  } else {
    this.employeeForm.markAllAsTouched();
  }
}

}
