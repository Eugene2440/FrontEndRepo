import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'https://your-backend-api-url.com/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, { email, password });
  }
}
