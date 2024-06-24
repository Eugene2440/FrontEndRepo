import { Component } from '@angular/core';
import { CalendarEvent, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NotificationService } from '../notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    { 
      start: new Date(),
      end: new Date(),
      title: 'Student Event',
    },
  ];

  constructor(private notificationService: NotificationService) {}

  handleEvent(action: string, event: CalendarEvent): void {
    this.notificationService.showInfo(`Event: ${event.title}`, 'Event Clicked');
  }
}
