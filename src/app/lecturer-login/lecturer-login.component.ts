import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LecturerService } from '../lecturer.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-lecturer-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './lecturer-login.component.html',
  styleUrl: './lecturer-login.component.css'
})
export class LecturerLoginComponent {

loginForm: FormGroup;
message: string = '';
lecturerId!: number;


  constructor(private fb: FormBuilder, private lecturerService: LecturerService, private router: Router, private authService:AuthService) {
    this.loginForm = this.fb.group({
      regNo: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });}

         
  
 
     
    login(): void {
      if (this.loginForm.invalid) {
        this.message = 'Please fill in all required fields.';
        return;
      }
  
      const lecturerData = this.loginForm.value;
      const regNo = lecturerData.regNo;
      const password = lecturerData.password;
  
      this.authService.login(regNo, password).subscribe(
        (response) => {
          const token = response.token;
          localStorage.setItem('token', token);
          this.router.navigate(['/LecturerHome']);
        },
        (error) => {
          this.message = 'Invalid Registration Number or Password.';
        }
      );
    }
  }
