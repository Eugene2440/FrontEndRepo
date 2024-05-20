import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs'
import { Stu } from './stu';
import { Lecs } from './lecs';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://localhost:44314/api'; 

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Stu[]> {
    return this.http.get<Stu[]>(`${this.apiUrl}/Student/GetStudents`);
  }
  getAllLecturers(): Observable<Lecs[]> {
    return this.http.get<Lecs[]>(`${this.apiUrl}/Lecturer/GetLecturers`);
  }
 
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/Course/GetAllCourses`);
  }
  
  addCourse(courseData: Course): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/Course/AddCourse`, courseData, { headers, responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error adding course:', error);
        return throwError(() => new Error('Error adding course'));
      })
    );
  }
   registerLecturer(lecturerData: Lecs): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/Lecturer/Register`, lecturerData, { headers }).pipe(
      catchError((error) => {
        console.error('Error registering lecturer:', error);
        return throwError(() => new Error('Error registering lecturer'));
      })
    );
  }
  registerStudent(studentData: Stu): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/Student/Register`, studentData, { headers });
  }
  updateStudent(studentData: Stu): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(
      `${this.apiUrl}/Student/UpdateStudent?studentId=${studentData.studentId}`,
      studentData,
      { headers }
    );
  }
  updateLecturer(lecturerData: Lecs): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put(
      `${this.apiUrl}/Lecturer/UpdateLecturer?lecturerId=${lecturerData.lecturerId}`,
      lecturerData,
      { headers }
    );
  }
  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Student/DeleteStudent?studentId=${studentId}`);
  }
  deleteLecturer(lecturerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Lecturer/DeleteLecturer?lecturerId=${lecturerId}`);
  }
}
