import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, RouterOutlet,CommonModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css'
})
export class StudentRegistrationComponent {

}
