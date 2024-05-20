import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StudentLoginComponent } from '../student-login/student-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule,RouterOutlet,RouterLink,CommonModule,RouterLinkActive ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
