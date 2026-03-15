import { Component, signal } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AttendanceComponent } from '../attendance/attendance';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  templateUrl: './attendance-dashboard.html',
  styleUrls: ['./attendance-dashboard.css']
})
export class AttendanceDashboardComponent {

  API = 'https://hrml-backend.vercel.app/api/attendance';

  attendances = signal<any[]>([]);
  searchText = signal('');
  currentPage = signal(1);
  itemsPerPage = signal(5);

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    this.http.get<any[]>(this.API).subscribe({
      next: (data) => this.attendances.set(data),
      error: () => alert('Failed to load attendance')
    });
  }

  openAddAttendance() {
    const dialogRef = this.dialog.open(AttendanceComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.loadAttendance();
      }
    });
  }

  get filteredAttendance() {
    return this.attendances()
      .filter(r =>
        r.employee_id.toString().includes(this.searchText()) ||
        r.status.toLowerCase().includes(this.searchText().toLowerCase())
      );
  }

  get paginatedAttendance() {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.filteredAttendance.slice(start, start + this.itemsPerPage());
  }

  totalPages() {
    return Math.ceil(this.filteredAttendance.length / this.itemsPerPage()) || 1;
  }

  nextPage() {
    if (this.currentPage() < this.totalPages())
      this.currentPage.set(this.currentPage() + 1);
  }

  prevPage() {
    if (this.currentPage() > 1)
      this.currentPage.set(this.currentPage() - 1);
  }

}
