import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component ,signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
 imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,     // 🔥 Add this
    MatDialogModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('HRMS-Lite');
   }
