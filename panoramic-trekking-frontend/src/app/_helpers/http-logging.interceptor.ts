import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators'; // fancy pipe-able operators

@Injectable()
export class HttpLoggingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        response => console.log('>>>>> HTTP [Oh boy we got an answer]: ', response),
        error => console.log('>>>>> HTTP [Something might be burning back there]: ', error)
      ));
  }
}
