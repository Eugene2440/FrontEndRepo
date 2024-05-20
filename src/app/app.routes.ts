import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes =
 [{path:'',component:AdminComponent},
 {path:'Register',component:StudentLoginComponent },
{path:'Home',component:HomeComponent},
{path:'Login',component:StudentRegistrationComponent}];
