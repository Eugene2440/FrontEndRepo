import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Unit } from '../admin/unit';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { LecturerService } from '../lecturer.service';
import { AuthService } from '../auth.service';
import { Week } from '../week';
import { CalendarEvent } from 'angular-calendar';
import { CalendarModule } from 'angular-calendar';


@Component({
  selector: 'app-lecturer',
  standalone: true,


  imports: [RouterLink,RouterLinkActive,CommonModule,CalendarModule],
  templateUrl: './lecturer.component.html',
  styleUrl: './lecturer.component.css'
})
export class LecturerComponent {
  teachingUnits: Unit[] = [];
  lecturerId!:number;
  unitId!: number;
  weeks: Week[] = [];
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(),
      end: new Date(),
      title: 'Student Event',
    },
  ];



  constructor( private lecturerService:LecturerService, private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    this.lecturerId = this.authService.getLecturerId()!;
    console.log('Lecturer ID:', this.lecturerId); 
    
    if (this.lecturerId) {
      this.getTeachingUnits(this.lecturerId);
    }
    this.getWeeks(this.unitId);

  }

  getTeachingUnits(lecturerId: number): void {
    this.lecturerService.getTeachingUnits(lecturerId).subscribe(units => {
      this.teachingUnits = units;
      console.log('Teaching Units:', this.teachingUnits); // Debugging log
    });
  }
  
  getWeeks(unitId: number): void {
    this.lecturerService.getWeeks(unitId).subscribe(weeks => {
      this.weeks = weeks;
    });
  }

  
  viewUnitDetails(unitId: number): void {
    this.router.navigate(['unit', unitId]);
  }
}

