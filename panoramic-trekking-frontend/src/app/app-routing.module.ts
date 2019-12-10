import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { ViewPhotoDetailsComponent } from './view-photo-details/view-photo-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

export const routes: Routes = [
  /* ----- anonymous routes ----- */
  // {
  //  path: '',
  //  redirectTo: '/home',
  //  pathMatch: 'full'
  // },
  { path: 'login', component: LoginComponent, data: {title: 'Login'} },
  { path: 'register', component: RegisterComponent, data: {title: 'Register Here'} },

  /* ----- authenticated routes ----- */
  { path: 'home', component: HomeComponent, data: {title: 'Home Landing Page'} }, // , canActivate: [AuthGuard] },
  { path: 'add-photo', component: AddPhotoComponent, data: {title: 'Add Photo'} },
  { path: 'view-photo-details', component: ViewPhotoDetailsComponent, data: {title: 'View Photo Details'} },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot( routes, { enableTracing: true } )], // { enableTracing: false } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
