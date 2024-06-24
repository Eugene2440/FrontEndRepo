import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { Stu } from '../admin/stu';
import { Router } from '@angular/router';

import { DeleteComponent } from '../delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Lecs } from '../admin/lecs';
import { DeleteLecComponent } from '../delete-lec/delete-lec.component';
import { Course } from '../admin/course';
import { Unit } from '../admin/unit';
import { LecUnits } from '../lec-units';
@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css'
})
export class AdministratorComponent {


  showEditStudentForm = false;
  sideBarItem: string = '';
  showAddStudentForm = false;
  editForm!: FormGroup;
  addForm!: FormGroup;
  students: Stu[] = [];
  selectedStudent: Stu | null = null;

  showAddLecForm = false;
  showEditLecForm = false;
  editLecForm!: FormGroup;
  addLecForm!: FormGroup;
  lecturers: Lecs[] = [];
  selectedLec: Lecs | null = null;
  filteredLecturers: Lecs[] = [];

  courses: Course[] = [];
  courseForm!: FormGroup;
  course: Course = { courseId: 0, courseName: '', years: [] };
  filteredCourses: Course[] = [];
  searchTerm: string = '';
  allocationForm!: FormGroup;
  showAllocationForm = false;
  teachingUnits!: string[];
  teachingUnitsFormArray!: FormArray;
  lecturerId!: number;

  selectedLecturerId: number | null = null;
  selectedUnits: Unit[] = [];

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService, private dialog: MatDialog) { }
  ngOnInit() {
    this.getAllStudents()
    this.getAllLecturers()
    this.loadCourses()
    this.addForm = this.fb.group({
      firstname: ['', Validators.required],
      middlename: ['', Validators.required],
      surname: ['', Validators.required],
      registrationNumber: ['', Validators.required],
      courseId: ['', Validators.required],
      year: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      surName: ['', Validators.required],
      regNo: ['', Validators.required],
      course: ['', Validators.required],
      year: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.addLecForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      surName: new FormControl('', Validators.required),
      regNo: new FormControl('', Validators.required),
      school: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      teachingUnits: ['']

    });

    this.editLecForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      surName: new FormControl('', Validators.required),
      lecCode: new FormControl('', Validators.required),
      school: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required)
    });
    this.allocationForm = this.fb.group({
      lecturerId: this.selectedLecturerId,
      selectedUnits: this.fb.array([])
    });

  }

 
  sideBar(menuItem: string): void { this.sideBarItem = menuItem; }
  AddStudentForm() { this.showAddStudentForm = true; }
  closeForms() {
    this.showEditStudentForm = false
    this.showAddStudentForm = false
    this.addForm.reset();
    this.editForm.reset();
    this.showEditLecForm = false
    this.showAddLecForm = false
    this.addLecForm.reset();
    this.addLecForm.reset();
    this.showAllocationForm = false;
    this.selectedUnits = [];
    this.selectedLecturerId = null;
    this.allocationForm.reset()
  }
  showEditForm() { this.showEditStudentForm = true; }

  getAllStudents(): void {
    this.adminService.getAllStudents().subscribe(
      (data: Stu[]) => {
        this.students = data;

        console.log('Students data:', this.students);  // Log the retrieved data

      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  registerStudent(): void {
    if (this.addForm.invalid) {
      return;
    }

    const studentData: Stu = {
      firstName: this.addForm.get('firstname')?.value,
      middleName: this.addForm.get('middlename')?.value,
      surName: this.addForm.get('surname')?.value,
      regNo: this.addForm.get('registrationNumber')?.value,
      studentId: 0,
      year: this.addForm.get('year')?.value,
      email: this.addForm.get('email')?.value,
      courseId: this.addForm.get('courseId')?.value,
    };
    this.adminService.registerStudent(studentData).subscribe(
      (response) => {
        console.log('Student registered successfully');
        this.getAllStudents
        this.closeForms();
        this.getAllStudents

      },
      (error) => {
        console.error('Error registering student:', error);
      }
    );
  }
  editStudent(student: Stu): void {
    this.selectedStudent = student;
    this.editForm.patchValue(student);
    this.showEditStudentForm = true;
  }
  saveChanges(): void {
    if (this.selectedStudent) {
      const updatedStudent = { ...this.selectedStudent, ...this.editForm.value };
      this.adminService.updateStudent(updatedStudent).subscribe(
        (response) => {
          console.log('Student updated successfully:', response);
          this.selectedStudent = null;
          this.getAllStudents();
          this.closeForms();
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }
  deleteStudent(student: Stu): void {
    this.adminService.deleteStudent(student.studentId).subscribe(
      () => {
        console.log('Student deleted successfully');
        this.getAllStudents();
      },
      (error) => {
        console.log('Error deleting student: ' + error.message);
      }
    );
  }
  openDeleteDialog(student: Stu): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteStudent(student);
      }
    });
  }
  openDeleteLecDialog(lecturer: Lecs): void {
    const dialogRef = this.dialog.open(DeleteLecComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLecturer(lecturer);
        this.getAllLecturers();
      }
    });
  }
  showEditLecturerForm() { this.showEditLecForm = true; }
  AddLecturerForm() { this.showAddLecForm = true; }
  getAllLecturers(): void {

    this.adminService.getAllLecturers().subscribe(
      (data: Lecs[]) => {
        this.lecturers = data;
        this.filteredLecturers = [...this.lecturers];
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  registerLecturer(): void {
    const lecturerData: Lecs = {
      firstName: this.addLecForm.get('firstName')?.value,
      middleName: this.addLecForm.get('middleName')?.value,
      surName: this.addLecForm.get('surName')?.value,
      regNo: this.addLecForm.get('regNo')?.value,
      school: this.addLecForm.get('school')?.value,
      email: this.addLecForm.get('email')?.value,
      phoneNumber: this.addLecForm.get('phoneNumber')?.value,
      lecturerId: 0,
      selectedUnits: []
    };

    this.adminService.registerLecturer(lecturerData).subscribe(
      (response) => {
        console.log('Lecturer registered successfully:', response);
        this.getAllLecturers
        this.closeForms();
      },
      (error) => {
        console.error('Error registering Lecturer:', error);
      }
    );
  }
  registerLec() {
    const selectedUnits = this.allocationForm.get('selectedUnits')?.value;
    console.log(selectedUnits);
  }
  editLecturer(lecturer: Lecs): void {
    this.selectedLec = lecturer;
    this.editLecForm.patchValue(lecturer);
    this.showEditLecForm = true;
  }
  saveLecturerChanges(): void {
    if (this.selectedLec) {
      const updatedLec = { ...this.selectedLec, ...this.editLecForm.value };
      this.adminService.updateLecturer(updatedLec).subscribe(
        (response) => {
          console.log('Lecturer updated successfully:', response);
          this.selectedLec = null;
          this.getAllLecturers();
          this.closeForms();
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }
  deleteLecturer(lecturer: Lecs): void {
    this.adminService.deleteLecturer(lecturer.lecturerId).subscribe(
      () => {
        console.log('Lecturer deleted successfully');
        this.getAllLecturers();
      },
      (error) => {
        console.log('Error deleting lecturer: ' + error.message);
      }
    );
  }
  loadCourses(): void {
    this.adminService.getAllCourses().subscribe(response => {
      this.courses = response.map(course => course);
      console.log('Courses received:', response);

    });

  }
  deleteCourse(courseId: number): void {
    this.adminService.deleteCourse(courseId).subscribe(() => {
      this.courses = this.courses.filter(course => course.courseId !== courseId);
    });
  }
  deleteUnit(unitId: number, courseId: number): void {
    this.adminService.deleteUnit(unitId).subscribe(() => {
      const course = this.courses.find(c => c.courseId === courseId);
      if (course) {
        for (const year of course.years) {
          for (const semester of year.semesters) {
            semester.units = semester.units.filter(unit => unit.unitId !== unitId);
          }
        }
      }
      this.loadCourses();

    });
  }
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
        this.loadCourses();
      },
      error => {
        console.error('Error adding course:', error);
      }
    );
  }
  navigate() {
    this.router.navigate(['/Course']);
  }
  allocateUnitForm(lecturers: Lecs) {
    this.selectedLecturerId = lecturers.lecturerId;
    this.showAllocationForm = true;
    this.allocationForm.patchValue({
      lecturerId: this.selectedLecturerId
    });
  
  }
  editLecturerUnits(lecturer: Lecs): void {
    this.selectedLec = lecturer;
    this.editLecForm.patchValue(lecturer);
    this.showEditLecForm = true;
    console.log(this.selectedLec)
  }
  onUnitChange(unit: Unit, event: any) {
    if (event.target.checked) {
      this.selectedUnits.push(unit);
    } else {
      this.selectedUnits = this.selectedUnits.filter(u => u.unitId !== unit.unitId);
    }
  }
  
  allocateUnits() {
    if (this.selectedLecturerId) {
      // Extracting only unitId from selectedUnits
      const unitIds = this.selectedUnits.map(unit => unit.unitId);
      
      
      this.adminService.allocateUnits(this.selectedLecturerId, unitIds).subscribe(response => {
        console.log('Units allocated successfully', response);
        this.closeForms();
      }, error => {
        console.error('Error allocating units', error);
      });
    }
  }
  


}
//   getSelectedUnitsControls(): FormControl[] {
//     return (this.allocationForm.get('selectedUnits') as FormArray).controls as FormControl<any>[];
//   }
//   getUnitByIndex(index: number) {
//     let counter = 0;
//     for (const course of this.courses) {
//       if (course.years && course.years.length > 0) {
//         for (const year of course.years) {
//           if (year.semesters && year.semesters.length > 0) {
//             for (const semester of year.semesters) {
//               if (semester.units && semester.units.length > 0) {
//                 for (const unit of semester.units) {
//                   console.log(`Counter: ${counter}, Index: ${index}`);
//                   if (counter === index) {
//                     console.log('Returning Unit:', unit);
//                     return unit;
//                   }
//                   counter++;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     console.log('No unit found at the given index:', index);
//     return null;
//   }
//   allocateUnits(): void {
//     const selectedUnits: string[] = [];
//     const selectedControls = this.getSelectedUnitsControls();

//     // Flatten the units array with their indices
//     let allUnits: { unit: any, index: number }[] = [];
//     let counter = 0;
//     for (const course of this.courses) {
//       if (course.years && course.years.length > 0) {
//         for (const year of course.years) {
//           if (year.semesters && year.semesters.length > 0) {
//             for (const semester of year.semesters) {
//               if (semester.units && semester.units.length > 0) {
//                 for (const unit of semester.units) {
//                   allUnits.push({ unit, index: counter });
//                 }
//               }
//             }
//           }
//         }
//       }
//     }

//     // Iterate over the selected controls and use their indices to find the corresponding units
//     selectedControls.forEach((control, index) => {
//       if (control.value && allUnits[index]) {
//         selectedUnits.push(allUnits[index].unit.unitName);
//       }
//     });

//     console.log('Selected Units:', selectedUnits);


//     this.adminService.updateLecturerUnits(this.allocationForm.value.lecturerId, selectedUnits)
//       .subscribe(response => {
//         console.log('Units allocated successfully', response);
//         this.closeForms();
//       });
//   }
// }