import { Component , OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { HttpDataService , StorageService , MessageService } from '../../core/service';

import { Especialidades , Medicos , Turnos , Horas , Iafas , DataSend } from '../../core/models';

@Component({
  selector: 'app-agenda-medica',
  templateUrl: './agenda-medica.component.html',
  styleUrls: ['./agenda-medica.component.css'],
})
export class AgendaMedicaComponent implements OnInit {
  turnos$: Observable<Turnos[]>;
  iafas$: Observable<Iafas[]>;
  medicos: Medicos[];
  horas: Horas[];
  especialidades: Especialidades[];
  formularioAgendaMedica: FormGroup;
  check = false;
  status = 'status';
  messages = 'message';
  constructor(
    private fb: FormBuilder,
    private data: HttpDataService,
    private storage: StorageService,
    private message: MessageService
  ) {}
  ngOnInit(): void {
    this.formularioAgendaMedica = this.fb.group({
      fecha: [null, Validators.required],
      especialidad: [{ value: '', disabled: true }, Validators.required],
      medico: [{ value: '', disabled: true }, Validators.required],
      turno: [{ value: '', disabled: true }, Validators.required],
      hora: [{ value: '', disabled: true }, Validators.required],
      cns: [false],
      correo: [{ value: '', disabled: true }, Validators.required],
      telcel: [{ value: '', disabled: true }, Validators.required],
      iafas: [{ value: '', disabled: true }],
    });
  }

  fecha(data: Date) {
    return new Date(data).getDate() + 1 < new Date().getDate() && new Date(data).getMonth() < new Date().getMonth()
      ? this.message.MessageInfo('La fecha seleccionada es menor a la actual!') : this.getSelectFecha(data);
  }

  get formAgendaMedica() {
    return this.formularioAgendaMedica.controls;
  }

  getSelectFecha(fecha: Date) {
    this.data.Especialidades(fecha).subscribe((data) => {
      data[this.status] === false ? this.message.MessageInfo(data[this.messages]) :
      ((this.especialidades = data), this.formAgendaMedica.especialidad.enable());
    });
  }

  getSelectEspecialidad() {
      this.check = this.formularioAgendaMedica.value.especialidad === '001' ? true : false;
      this.data.Medicos( this.formularioAgendaMedica.value ).subscribe((data) => {
      if (data[this.status] === false){
        this.message.MessageInfo( data[this.messages] );
        this.formAgendaMedica.medico.setValue('');
        this.formAgendaMedica.medico.disable();
        return;
      }
      this.medicos = data;
      this.formAgendaMedica.medico.enable();
      });
  }

  getSelectMedico() {
    this.turnos$ = this.data.Tunos(this.formularioAgendaMedica.value);
    this.formAgendaMedica.turno.enable();
  }

  getSelectTurno() {
    this.data.Horas(this.formularioAgendaMedica.value).subscribe((data) => {
      if (data[this.status] === false) {
        this.message.MessageInfo(data[this.messages]);
        return;
      }
      this.horas = data;
      this.formAgendaMedica.hora.enable(),
      this.formAgendaMedica.correo.enable(),
      this.formAgendaMedica.telcel.enable();
    });
  }

  disabledIafas(data: boolean) {
    if (!data) {
      this.formularioAgendaMedica.controls.iafas.disable();
      return;
    }
    this.formularioAgendaMedica.controls.iafas.enable();
    this.iafas$ = this.data.Iafas();
  }

  postEnviarDatos() {
    this.data
      .postGenerarCitas(new DataSend(this.formularioAgendaMedica.value, this.data.historia))
      .subscribe((data) => {
        this.message.MessageEnvio(data);
        this.storage.removeSession();
        this.Correo(data);
      });
  }

  Correo(data: any) {
    this.data.getCorreo(data).subscribe((response) => console.log(response));
  }
}
