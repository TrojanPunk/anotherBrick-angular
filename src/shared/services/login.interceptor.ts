import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor() {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const LOCAL_TOKEN = JSON.parse(localStorage.getItem('accessTokens')!).accessToken;
    request = request.clone({headers: request.headers.set('Authorization', 'bearer' + LOCAL_TOKEN)});
    return next.handle(request);
  }
}
