import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//
import { environment } from '../../../environments/environment';
//
import { StorageService } from './storage.service';
//
import {
  Especialidades,
  Medicos,
  Turnos,
  Horas,
  Iafas,
  DataSend,
  Message,
  Email,
  User,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpDataService {
  headers: HttpHeaders;
  email: Email;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  fecha(fecha: Date) {
    const date = new Date(fecha);
    date.setDate(date.getDate() + 1);
    date.setMonth(date.getMonth());
    return date.toLocaleDateString('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  get historia() {
    return this.storageService.getUsers().map((historia: User) => historia.historia);
  }

  Paciente(): Observable<User> {
    return of(this.storageService.getUsers());
  }

  Especialidades(fecha: Date) {
    const url = `${environment.apiURL}/especialidades?fecha=${this.fecha(
      fecha
    )}&historia=${this.historia}`;
    return this.http.get<Especialidades[]>(url);
  }

  Medicos(data: any): Observable<Medicos[]> {
    const url = `${environment.apiURL}/medicos?especialidad=${data.especialidad}&fecha=${this.fecha(data.fecha)}&historia=${this.historia}`;
    return this.http.get<Medicos[]>(url);
  }

  Tunos(data: any): Observable<Turnos[]> {
    const url = `${environment.apiURL}/turnos?especialidad=${data.especialidad}&fecha=${this.fecha(data.fecha)}&medico=${data.medico}`;
    return this.http.get<Turnos[]>(url);
  }

  Horas(data: any): Observable<Horas[]> {
    const url = `${environment.apiURL}/horas?programacion=${data.turno}`;
    return this.http.get<Horas[]>(url);
  }

  Iafas(): Observable<Iafas[]> {
    const url = `${environment.apiURL}/iafas`;
    return this.http.get<Iafas[]>(url);
  }

  postGenerarCitas(data: DataSend): Observable<Message> {
    const url = `${environment.apiURL}/citas`;
    return this.http.post<Message>(url, data);
  }

  getCorreo(correo: any) {
    this.email = {
      id: correo[0].v_retorno,
      correo: correo[0].p_mail,
    };

    const url = `${environment.apiURL}/email`;
    return this.http.post(url, this.email);
  }
}
