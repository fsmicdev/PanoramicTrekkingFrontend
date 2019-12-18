import { BrowserModule, Title } from '@angular/platform-browser';
import { ClassProvider, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatIconModule, MatButtonModule, MatMenuModule } from '@angular/material';

import { AddPhotoComponent } from './add-photo/add-photo.component';

import { MatFileUploadModule } from 'angular-material-fileupload';
import { ViewPhotoDetailsComponent } from './view-photo-details/view-photo-details.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ManageTagsComponent } from './manage-tags/manage-tags.component';
import { LoginComponent } from './login/login.component';

import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { RegisterComponent } from './register';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './_helpers';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { HttpLoggingInterceptor } from '@/_helpers/http-logging.interceptor';
import { FeedbackDialogComponent } from '@/feedback-dialog/feedback-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

const HTTP_LOGGING_INTERCEPTOR_PROVIDER: ClassProvider = {
  provide: HTTP_INTERCEPTORS ,
  useClass: HttpLoggingInterceptor,
  multi: true
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatFileUploadModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatFileUploadModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  declarations: [
    FeedbackDialogComponent,
    AppComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent,
    HomeComponent,
    AddPhotoComponent,
    ViewPhotoDetailsComponent,
    ManageTagsComponent
  ],
  providers: [
    Title,
    HTTP_LOGGING_INTERCEPTOR_PROVIDER,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
