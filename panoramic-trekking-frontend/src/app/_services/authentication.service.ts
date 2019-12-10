import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { User } from '../_models';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(usernameVal, passwordVal): any {
        const userLoginApiUrl = `${environment.usersApiUrl}/users/loginUser`;
        console.log('>>> userLoginApiUrl: ', userLoginApiUrl);

        this.http.post<any>(userLoginApiUrl, {
          username : usernameVal,
          password : passwordVal },
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            })
          }).subscribe(
          res => {
            console.log('>>>>> AUTHENTICATION SERVICE (Positive) RESULT: ', res);
            if (res) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(res));
              // if (res instanceof User) {
              this.currentUserSubject.next(res);
              // }
              return res;
            }
          },
          err => {
            console.log('>>> Error occured, ', err);
          }
        );
          /*
          .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }));
        */
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }
}
