import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unit } from './admin/unit';
import { Week } from './week';
import { Topic } from './topic';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {
  currentUnitId: number | undefined;

  constructor(private http: HttpClient) {}

  private apiUrl = 'https://localhost:44314/api/Lecturer';

  sendVerificationCode(regNo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-verification-code`, JSON.stringify(regNo), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  verifyLecturer(regNo: number, verificationCode: string): Observable<any> {
    const model = { regNo, verificationCode };
    return this.http.post<any>(`${this.apiUrl}/verify`, model);
  }

  login(regNo: string, password: string): Observable<any> {
    const loginModel = { regNo, password };
    return this.http.post<any>(`${this.apiUrl}/Login`, loginModel);
  }

  getTeachingUnits(lecturerId: number): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.apiUrl}/TeachingUnit/${lecturerId}`);
  }
  
  getWeeks(unitId: number): Observable<Week[]> {
    return this.http.get<Week[]>(`https://localhost:44314/api/Topic/unit/${unitId}`);
  }
  setUnitId(unitId: number): void {
    this.currentUnitId = unitId;
  }

  getUnitId(): number | undefined {
     return this.currentUnitId;
  }

  addTopic(formData: FormData): Observable<any> {
    return this.http.post(`https://localhost:44314/api/Topic`, formData);
  }
}
