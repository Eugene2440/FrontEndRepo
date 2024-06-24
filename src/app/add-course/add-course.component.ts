import { Component } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { Course } from '../admin/course';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';


@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLinkActive, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  courses: Course[] = [];
  course: Course = { courseId: 0, courseName: '', years: [] };

  constructor(private adminService: AdminService) { }
  addYear() {
    this.course.years.push({ yearId: 0, yearNumber: this.course.years.length + 1, semesters: [] });
  }

  removeYear(index: number) {
    this.course.years.splice(index, 1);
  }

  addSemester(yearIndex: number) {
    this.course.years[yearIndex].semesters.push({ semesterId: 0, semesterNumber: this.course.years[yearIndex].semesters.length + 1, units: [] });
  }

  removeSemester(yearIndex: number, semesterIndex: number) {
    this.course.years[yearIndex].semesters.splice(semesterIndex, 1);
  }

  addUnit(yearIndex: number, semesterIndex: number) {
    this.course.years[yearIndex].semesters[semesterIndex].units.push({ unitId: 0, unitName: '' });
  }

  removeUnit(yearIndex: number, semesterIndex: number, unitIndex: number) {
    this.course.years[yearIndex].semesters[semesterIndex].units.splice(unitIndex, 1);
  }

  onSubmit() {
    this.adminService.addCourse(this.course).subscribe(
      response => {
        console.log('Course added successfully', response);
        this.course = { courseId: 0, courseName: '', years: [] };
      },
      error => {
        console.error('Error adding course:', error);
      }
    );
  }
}
