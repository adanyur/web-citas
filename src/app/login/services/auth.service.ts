import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Auth } from '../models/auth.models';
import { Session } from '../../core/models/session.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ Accept: 'application/json' });
  }

  Login(login: Auth): Observable<Session> {
    const URL = `${environment.apiURL}/login`;
    return this.http.post<Session>(URL, login);
  }
}
