import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';



@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
  loginFormData = { email: '', password: '' };
  registerFormData = { email: '', password: '' };

  constructor(private studentService: StudentService, private router: Router) {}
  onRegister() {
    this.studentService.register(this.registerFormData.email, this.registerFormData.password)
      .subscribe(response => {
        // Handle registration response from backend
        console.log('Registration Response:', response);
        // Redirect to another route after successful registration
        this.router.navigate(['/dashboard']); // Example route
      }, error => {
        // Handle registration error
        console.error('Registration Error:', error);
      });
  }

}
