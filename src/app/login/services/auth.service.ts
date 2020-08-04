import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
//
import { environment } from "../../../environments/environment";
//MODELS
import { Auth } from "../models/auth.models";
import { Session } from "../../core/models/session.models";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  headers: HttpHeaders;
  auth: Auth;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ Accept: "application/json" });
  }

  Login(login: Auth): Observable<Session> {
    const URL = `${environment.apiURL}/ingreso`;
    return this.http.post<Session>(URL, login);
  }
}
