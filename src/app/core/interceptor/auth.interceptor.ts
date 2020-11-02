import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler , HttpInterceptor, HttpRequest , HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('TOKEN');
        if (!token){
          return next.handle(req);
        }
        const headers = req.clone({
          setHeaders: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
          }
        });

        return next.handle(headers).pipe(
          catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
          this.router.navigateByUrl('');
          }
          return throwError( err );
        }));
  }
}
