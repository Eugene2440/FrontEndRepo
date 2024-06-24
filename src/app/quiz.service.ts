import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://localhost:5001/api/quiz';

  constructor(private http: HttpClient) { }

  createQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, quiz);
  }

  addQuestion(question: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addQuestion`, question);
  }

  submitQuiz(answers: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submitQuiz`, answers);
  }
}
