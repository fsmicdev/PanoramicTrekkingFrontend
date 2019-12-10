import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { User } from '../_models';
import { UserLoginRequest } from '../_models';

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

    public async loginUser(usernameVal, passwordVal): Promise<Observable<User>> {
      const userLoginApiUrl = `${environment.usersApiUrl}/users/loginUser`;
      console.log('>>> userLoginApiUrl: ', userLoginApiUrl);

      const userLoginRequest: UserLoginRequest = new UserLoginRequest();
      userLoginRequest.username = usernameVal;
      userLoginRequest.password = passwordVal;

      try {
        return this.http.post<User>(userLoginApiUrl, userLoginRequest,
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            })
          }).toPromise().then(data => {
          localStorage.setItem('currentUser', JSON.stringify(data));
          const observableUser = of(data);
          this.currentUser = observableUser;
          console.log('>>>>> >>>>> LOGGED-IN USER ', data);
          if (data instanceof User) {
            console.log('##### data is an instanceof User - good!');
          } else {
            const loggedInUser = Object.assign(new User(), data);
            console.log('##### loggedInUser as User object: ', loggedInUser);
            // this.currentUserSubject.next(loggedInUser);
          }
          console.log('<<<<< RETURNING observableUser: ', observableUser);
          return observableUser;
        }); // @TODO: Handle Error/Exception case
      } catch {
        console.log('>>>>>--->>>>> EXCEPTION <<<<<---<<<<<');
      }
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);

        return of(result as T);
      };
    }

    private log(message: string) {
      console.log(message);
    }
}
