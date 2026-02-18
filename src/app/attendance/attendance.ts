import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatDialogModule],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.css'],
})
export class AttendanceComponent {
  API = 'http://127.0.0.1:8000/api/attendance/';
  attendanceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<AttendanceComponent>
  ) {
    this.attendanceForm = this.fb.group({
      employee_id: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  addAttendance() {
    if (this.attendanceForm.valid) {
      this.http.post(this.API, this.attendanceForm.value).subscribe({
        next: () => this.dialogRef.close({ success: true }),
        error: () => this.dialogRef.close({ success: false }),
      });
    } else {
      this.attendanceForm.markAllAsTouched();
    }
  }
}
