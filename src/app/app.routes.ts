import { Routes } from '@angular/router';
import { EmployeeDashboard } from './employee-dashboard/employee-dashboard';
import { AttendanceDashboardComponent } from './attendance-dashboard/attendance-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeDashboard },
  { path: 'attendance', component: AttendanceDashboardComponent },
];