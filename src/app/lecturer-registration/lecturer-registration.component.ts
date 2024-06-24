import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LecturerService } from '../lecturer.service';
import { CommonModule } from '@angular/common';
import { Unit } from '../admin/unit';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-lecturer-registration',
  standalone: true,
  imports: [ RouterLink, RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './lecturer-registration.component.html',
  styleUrl: './lecturer-registration.component.css'
})
export class LecturerRegistrationComponent {

  confirmationForm!:FormGroup;
  registrationForm: FormGroup;
  showVerificationCode = false;
  showPasswordForm=false;
  showWelcomeMessage=false;
  passwordForm!:FormGroup
  message: string | undefined;
  regNo!: number;
  teachingUnits: Unit[] = [];


  ngOnInit(): void {
    this.showVerificationCode = false;
    this.showPasswordForm = false;
    this.showWelcomeMessage = false;


  }
  constructor(private fb: FormBuilder, private lecturerService: LecturerService, private router: Router) {
    this.registrationForm = this.fb.group({
      regNo: ['', Validators.required]
    });
    this.confirmationForm = this.fb.group({
      verificationCode: ['', Validators.required]
    });
  
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

  }
 
  LecturerVerificationCode(): void {
    if (this.registrationForm.valid) {
      const regNo = this.registrationForm.get('regNo')!.value.toString()
      console.log('regNo:', regNo);
      this.showVerificationCode = true;
      this.lecturerService.sendVerificationCode(regNo).subscribe(
        response => {
          console.log('Verification code sent:', response);

        },
        error => {
          console.error('Error sending verification code:', error);
        }
      );
    }
  }
  confirmVerificationCode() {
    const regNo = this.registrationForm.get('regNo')!.value;
    const verificationCode = this.confirmationForm.get('verificationCode')!.value;
  
    this.lecturerService.verifyLecturer(regNo, verificationCode).subscribe(
      response => {
        console.log('Verification successful:', response);
        this.showPasswordForm = true;
        this.showVerificationCode = false;
      },
      error => {
        console.error('Error verifying student:', error);
        if (error.status === 404) {
          this.message = 'Lecturer not found';
        } else if (error.status === 400) {
          this.message = 'Invalid verification code';
        } else {
          this.message = 'An error occurred';
        }
      }
    );
  }
 changePassword() {
  if (this.passwordForm.valid && this.passwordForm.get('newPassword')!.value === this.passwordForm.get('confirmPassword')!.value) {
    this.showWelcomeMessage = true;
    this.showPasswordForm = false;
  } else {
    this.message = 'Passwords do not match or are invalid';
  }
}
}
