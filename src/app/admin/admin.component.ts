import { CommonModule } from '@angular/common';
import { Component,  NgModule,  OnInit } from '@angular/core';
import { Stu } from './stu';
import { AdminService } from './admin.service';
import { FormControl, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Lecs } from './lecs';
import { Lec } from '../lec';
import { Course } from './course';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit {
  selectedMenuItem: string = '';
  selectedItem: string = '';
  filteredStudents: Stu[] = [];
  filteredLecturers:Lecs[]=[];
  selectedStudent: Stu | null = null;
  selectedLecturer: Lecs | null = null;

  showForm: boolean = false;
  sidebarHidden: boolean = false;
  searchFormShown: boolean = false;
  darkMode: boolean = false;
  students: Stu[] = [];
  lecturers: Lecs[]=[];
  searchTerm: string = '';
  selectedFilter: string = '';
  editStudentForm!: FormGroup;
  editLecturerForm!: FormGroup;
  courses: Course[] = [];
  course: Course = { courseId: 0, courseName: '', units: [] };


  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllLecuturers();
    this.initEditStudentForm();
    this.initEditLecturerForm();
    this.loadCourses();

  }
  loadCourses(): void {
    this.adminService.getAllCourses().subscribe(
      (data) => {
        this.courses = data.map(course => ({ ...course, showUnits: false }));
      },
      (error) => {
        console.error('Error loading courses:', error);
      }
    );
  }
  addUnit() {
    this.course.units.push({ unitId: 0, unitName: '' });
  }

  removeUnit(index: number) {
    this.course.units.splice(index, 1);
  }

  onSubmit() {
    this.adminService.addCourse(this.course).subscribe(
      response => {
        console.log('Course added successfully', response);
        // Reset form after successful submission
        this.course = { courseId: 0, courseName: '', units: [] };
      },
      error => {
        console.error('Error adding course:', error);
      }
    );
  }
  getAllLecuturers(): void {

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
    registerLecturer (event: Event): void {
        event.preventDefault(); 
        
        const form = event.target as HTMLFormElement;

        const lecturerData: Lecs = {
          firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
          middleName: (form.elements.namedItem('middleName') as HTMLInputElement).value,
          surName: (form.elements.namedItem('surName') as HTMLInputElement).value,
          lecCode: (form.elements.namedItem('lecCode') as HTMLInputElement).value,
          password: (form.elements.namedItem('password') as HTMLInputElement).value,
          lecturerId: 0,
          email: (form.elements.namedItem('email') as HTMLInputElement).value,
          phoneNumber: (form.elements.namedItem('phoneNumber') as HTMLInputElement).value
        };

        this.adminService.registerLecturer(lecturerData).subscribe(
          (response) => {
            console.log('Lecturer registered successfully:', response);
            form.reset();
          },
          (error) => {
            console.error('Error registering Lecturer:', error);
          }
        );
      }

  initEditStudentForm(): void {
    this.editStudentForm = new FormGroup({
      studentId: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      surName: new FormControl('', Validators.required),
      regNo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  initEditLecturerForm(): void {
    this.editLecturerForm = new FormGroup({
      lectureId: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      surName: new FormControl('', Validators.required),
      lecCode: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
    });
  }

  onSearch(): void {
    this.filteredStudents = this.students.filter((student) => {
      const firstNameMatch = student.firstName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const surNameMatch = student.surName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const regNoMatch = student.regNo.toString().toLowerCase().includes(this.searchTerm.toLowerCase());

      return firstNameMatch || surNameMatch || regNoMatch;
    });
}





  getAllStudents(): void {
    this.adminService.getAllStudents().subscribe(
      (data: Stu[]) => {
        this.students = data;
        this.filteredStudents = [...this.students]; // Initialize filtered students with all students
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  editStudent(student: Stu): void {
    this.selectedStudent = student;
    this.editStudentForm.patchValue(student);
  }
  editLecturer(lecturers: Lecs) {
    this.selectedLecturer = lecturers;
    this.editLecturerForm.patchValue(lecturers);
    }

  updateStudent(): void {
    if (this.selectedStudent) {
      const updatedStudent = { ...this.selectedStudent, ...this.editStudentForm.value };
      this.adminService.updateStudent(updatedStudent).subscribe(
        (response) => {
          console.log('Student updated successfully:', response);
          this.selectedStudent = null;
          this.getAllStudents();
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }
  updateLecturer(): void {
    if (this.selectedLecturer) {
      const updatedLec = { ...this.selectedLecturer, ...this.editLecturerForm.value };
      this.adminService.updateLecturer(updatedLec).subscribe(
        (response) => {
          console.log('Lecturer updated successfully:', response);
          this.selectedLecturer = null;
          this.getAllLecuturers();
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }

  deleteStudent(student: Stu): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.adminService.deleteStudent(student.studentId).subscribe(
        () => {
          console.log('Student deleted successfully');
          this.getAllStudents();
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }
  deleteLecturer(lecturer: Lecs): void  {
    if (confirm('Are you sure you want to delete this student?')) {
      this.adminService.deleteLecturer(lecturer.lecturerId).subscribe(
        () => {
          console.log('Lecturer deleted successfully');
          this.getAllLecuturers();
        },
        (error) => {
          console.error('Error deleting Lecturer:', error);
        }
      );
    }
    }
  toggleSidebar(): void {
    this.sidebarHidden = !this.sidebarHidden;
  }

  toggleSearchForm(): void {
    if (window.innerWidth < 576) {
      this.searchFormShown = !this.searchFormShown;
    }
  }

  onResize(): void {
    if (window.innerWidth > 576) {
      this.searchFormShown = false;
    }
  }

  toggleDarkMode(event: Event): void {
    const switchMode = event.target as HTMLInputElement;
    if (switchMode.checked) {
      document.body.classList.add('dark');
      this.darkMode = true;
    } else {
      document.body.classList.remove('dark');
      this.darkMode = false;
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addNewStudent(): void {
    // Add logic here to handle form submission and add the new student
    // For simplicity, let's just toggle back to displaying the table after form submission
    this.showForm = false;
  }

  selectMenuItem(menuItem: string): void {
    this.selectedMenuItem = menuItem;
  }
  selectItem(menusItem: string): void {
    console.log('Selected item:', menusItem);
    if (
          menusItem === 'AddStudents'
       || menusItem === 'EditStudents'
       || menusItem === 'DeleteStudents'
       || menusItem === 'AddLecturers'
       || menusItem === 'EditLecturers'
       || menusItem === 'DeleteLecturers'
      ) {
      this.selectedItem = menusItem;
    }
  }
  registerStudent(event: Event): void {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target as HTMLFormElement;

    const studentData: Stu = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      middleName: (form.elements.namedItem('middleName') as HTMLInputElement).value,
      surName: (form.elements.namedItem('surName') as HTMLInputElement).value,
      regNo: (form.elements.namedItem('regNo') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      studentId: 0
    };

    this.adminService.registerStudent(studentData).subscribe(
      (response) => {
        console.log('Student registered successfully:', response);
        // Optionally, you can reset the form here
        form.reset();
      },
      (error) => {
        console.error('Error registering student:', error);
      }
    );
  }

  }




