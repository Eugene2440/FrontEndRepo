import { Component } from '@angular/core';
import { StudentSidebarComponent } from '../student-sidebar/student-sidebar.component';
import { AuthService } from '../auth.service';
import { StudentService } from '../student.service';
import { Course } from '../admin/course';
import { Unit } from '../admin/unit';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [StudentSidebarComponent,CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  studentId!: number
  course!: any
  courseId!: number
  student!: any
  firstName!:any
  myUnits: Unit[] = [];
  yearNumber!: number;
  semesterNumber!: number;
  
  constructor(private router:Router,private authService: AuthService, private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentId = this.authService.getStudentId()!;
    this.courseId = this.authService.getCourseId()!;
    this.yearNumber = this.authService.getYearNumber()!;
    this.semesterNumber = this.authService.getSemesterNumber()!;
   
    
    console.log('Student:', this.studentId, this.courseId);

   
    if (this.studentId) {
      this.getStudent(this.studentId);
    }
    if (this.courseId) {
      this.getUnits(this.courseId, this.yearNumber, this.semesterNumber);
    }
  }
  getUnits(courseId: number, yearNumber: number, semesterNumber: number): void {
    this.studentService.getUnitsByCourseYearSemester(courseId, yearNumber, semesterNumber).subscribe(units => {
      this.myUnits = units;
      console.log(this.myUnits);
    });
  }

  /*getCourse(courseId: number): void {
    this.studentService.getCourse(courseId).subscribe(course => {
      this.course = course;
            console.log(this.course);
    });
  }*/
  getStudent(studentId: number): void {
    this.studentService.getStudent(studentId).subscribe(student => {
      this.student = student;
      this.firstName = student.firstName;

      console.log(this.firstName,)
    });
  }
  getFirstName(): string {
    if (this.student && this.student.firstName) {
      return this.student.firstName;
    } else {
      return '';
    }
  }
  viewUnitDetails(unitId: number): void {
    this.router.navigate(['StudentUnit', unitId]);
  }

}