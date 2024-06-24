import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode, { JwtPayload, jwtDecode } from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, RouterLinkActive } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private lecturerId: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}
  
   login(regNo: string, password: string): Observable<any> {
      return this.http.post<any>('https://localhost:44314/api/Lecturer/Login', { regNo, password });
    }

  logout(): void {
    localStorage.removeItem('token');
    this.lecturerId = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }


  getLecturerId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const lecturerId = decodedToken ? parseInt(decodedToken.lecturerId, 10) : null;
      return lecturerId;
    }
    return null;
  }

  studentLogin(regNo: string, password: string): void {
    this.http.post<any>('https://localhost:44314/api/Student/Login', { regNo, password })
      .subscribe(response => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.router.navigate(['/StudentHome']);
      }, error => {
        console.error('Login failed', error);
      });
  }

  studentLogout(): void {
    localStorage.removeItem('token');
    this.lecturerId = null;
    this.router.navigate(['/login']);
  }

  isStudentLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }


  getStudentId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const studentId = decodedToken ? parseInt(decodedToken.studentId, 10) : null;
      return studentId;
    }
    return null;
  }
  getCourseId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const courseId = decodedToken ? parseInt(decodedToken.courseId, 10) : null;
      return courseId;
    }
    return null;
  }
  // auth.service.ts
getYearNumber(): number | null {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const yearNumber = decodedToken ? parseInt(decodedToken.yearNumber, 10) : null;
    return yearNumber;
  }
  return null;
}

getSemesterNumber(): number | null {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    const semesterNumber = decodedToken ? parseInt(decodedToken.semesterNumber, 10) : null;
    return semesterNumber;
  }
  return null;
}

}
