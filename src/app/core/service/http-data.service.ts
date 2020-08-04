import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, from, of } from "rxjs";
//
import { environment } from "../../../environments/environment";
//
import { StorageService } from "./storage.service";
//
import { Session } from "../models/session.models";
import { Paciente } from "../models/paciente.models";
import { Especialidades } from "../models/especialidades.models";
import { Medicos } from "../models/medicos.models";
import { Turnos } from "../models/turnos.models";
import { Horas } from "../models/horas.models";
import { Iafas } from "../models/iafas.model";
import { DataSend } from "../models/data-send.models";
import { Message } from "../models/message.models";
import { Email } from "../models/email.models";
import { User } from "../models/users.models";

@Injectable({
  providedIn: "root",
})
export class HttpDataService {
  headers: HttpHeaders;
  email: Email;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    let token = this.storageService.getToken();
    this.headers = new HttpHeaders({
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    });
  }

  fecha(fecha: Date) {
    let date = new Date(fecha);
    date.setDate(date.getDate() + 1);
    date.setMonth(date.getMonth());
    return date.toLocaleDateString("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  get historia() {
    return this.storageService.getUsers().map((x: User) => x.historia);
  }

  Paciente(): Observable<User> {
    return of(this.storageService.getUsers());
  }

  Especialidades(fecha: Date) {
    const url = `${environment.apiURL}/especialidades?fecha=${this.fecha(
      fecha
    )}&historia=${this.historia}`;
    return this.http.get<Especialidades>(url, { headers: this.headers });
  }

  Medicos(data: any): Observable<Medicos> {
    const url = `${environment.apiURL}/medicos?especialidad=${
      data.especialidad
    }&fecha=${this.fecha(data.fecha)}`;

    return this.http.get<Medicos>(url, { headers: this.headers });
  }

  Tunos(data: any): Observable<Turnos> {
    const url = `${environment.apiURL}/turnos?especialidad=${
      data.especialidad
    }&fecha=${this.fecha(data.fecha)}&medico=${data.medico}`;

    return this.http.get<Turnos>(url, { headers: this.headers });
  }

  Horas(data: any): Observable<Horas> {
    const url = `${environment.apiURL}/horas?programacion=${data.turno}`;
    return this.http.get<Horas>(url, { headers: this.headers });
  }

  Iafas(): Observable<Iafas> {
    const url = `${environment.apiURL}/iafas`;
    return this.http.get<Iafas>(url, { headers: this.headers });
  }

  postGenerarCitas(data: DataSend): Observable<Message> {
    const url = `${environment.apiURL}/citas`;
    return this.http.post<Message>(url, data, { headers: this.headers });
  }

  getCorreo(correo: any) {
    this.email = {
      id: correo[0].v_retorno,
      correo: correo[0].p_mail,
    };

    const url = `${environment.apiURL}/email`;
    return this.http.post(url, this.email, { headers: this.headers });
  }
}
