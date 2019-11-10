import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { ViewPhotoDetailsComponent } from './view-photo-details/view-photo-details.component';

export const routes: Routes = [
  /* anonymous routes */
  /* { path: 'loginuser', component: LoginComponent }, */

  /* authenticated routes */
  { path: 'add-photo', component: AddPhotoComponent, data: {title: 'Add Photo'} },
  { path: 'view-photo-details', component: ViewPhotoDetailsComponent, data: {title: 'View Photo Details'} },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot( routes, { enableTracing: false } )], // { enableTracing: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
