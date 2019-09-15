import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { ViewPhotoDetailsComponent } from './view-photo-details/view-photo-details.component';

export const routes: Routes = [
  /* anonymous routes */
  /* { path: 'loginuser', component: LoginComponent }, */

  /* authenticated routes */
  { path: 'add-photo', component: AddPhotoComponent },
  { path: 'view-photo-details', component: ViewPhotoDetailsComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot( routes, { enableTracing: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
