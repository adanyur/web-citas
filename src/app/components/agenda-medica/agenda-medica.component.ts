import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { HttpDataService , StorageService , MessageService } from '../../core/service';

import { Especialidades , Medicos , Turnos , Horas , Iafas , DataSend } from '../../core/models';

@Component({
  selector: 'app-agenda-medica',
  templateUrl: './agenda-medica.component.html',
  styleUrls: ['./agenda-medica.component.css'],
})
export class AgendaMedicaComponent implements OnInit {
  iafas$: Observable<Iafas[]>;
  horas: Horas[];
  horasSub: Subscription;
  medicos: Medicos[];
  medicosSub:Subscription;
  turnos: Turnos[];
  turnosSub:Subscription;
  especialidades: Especialidades[];
  especialidadesSub: Subscription;
  formularioAgendaMedica: FormGroup;
  check = false;
  status = 'status';
  messages = 'message';


  constructor(
    private fb: FormBuilder,
    private http: HttpDataService,
    private storage: StorageService,
    private message: MessageService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.formularioAgendaMedica = this.fb.group({
      fecha: [null, Validators.required],
      especialidad: [{ value: '', disabled: true }, Validators.required],
      medico: [{ value: '', disabled: true }, Validators.required],
      turno: [{ value: '', disabled: true }, Validators.required],
      hora: [{ value: '', disabled: true }, Validators.required],
      cns: [false],
      correo: [{ value: '', disabled: true }, [Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      telcel: [{ value: '', disabled: true }, [Validators.required,Validators.pattern('[0-9]{1,9}')]],
      iafas: [{ value: '', disabled: true }],
    });
  }
  
  get form() {
    return this.formularioAgendaMedica.controls;
  }

  get email(){
    return this.formularioAgendaMedica.get('correo');
  }
  get phone(){
    return this.formularioAgendaMedica.get('telcel');
  }

  fecha(data: Date) {
    return new Date(data).getDate() + 1 < new Date().getDate() && new Date(data).getMonth() < new Date().getMonth()
      ? this.message.MessageInfo('La fecha seleccionada es menor a la actual!') : this.getSelectFecha(data);
  }


  getSelectFecha(fecha: Date) {
   this.especialidadesSub = this.http.Especialidades(fecha).subscribe((data) => {
      data[this.status] === false ? this.message.MessageInfo(data[this.messages]) :
      ((this.especialidades = data), this.form.especialidad.enable());
    });
  }

  getSelectEspecialidad() {
      this.check = this.formularioAgendaMedica.value.especialidad === '001' ? true : false;
      this.medicosSub = this.http.Medicos( this.formularioAgendaMedica.value ).subscribe((data) => {
      if (data[this.status] === false){
        this.message.MessageInfo( data[this.messages] );
        this.form.medico.setValue('');
        this.form.medico.disable();
        return;
      }
      this.medicos = data;
      this.form.medico.enable();
      });
  }

  getSelectMedico() {
    this.turnosSub = this.http.Tunos(this.formularioAgendaMedica.value).subscribe(data=>{
        if (data[this.status] === false){
          this.message.MessageInfo(data[this.messages])
        }
      this.turnos=data;
      this.form.turno.enable();
    })
  }

  getSelectTurno() {
    this.horasSub = this.http.Horas(this.formularioAgendaMedica.value).subscribe(data=>{
     this.horas = data;
     this.form.hora.enable();
     this.form.correo.enable();
     this.form.telcel.enable();
   });
  }

  disabledIafas(data: boolean) {
    if (!data) {
      this.formularioAgendaMedica.controls.iafas.disable();
      return;
    }
    this.formularioAgendaMedica.controls.iafas.enable();
    this.iafas$ = this.http.Iafas();
  }

  postEnviarDatos() {
    this.message.MessageEnvio();
    this.http.postGenerarCitas(new DataSend(this.formularioAgendaMedica.value, this.http.historia))
      .subscribe((data) => {
        this.http.getLogout();
        this.storage.removeSession();
        this.message.MessageSucces(data[0].mensaje);
      });
  }


  OnDestroy() {
    this.especialidadesSub.unsubscribe();
    this.medicosSub.unsubscribe();
    this.turnosSub.unsubscribe();
    this.horasSub.unsubscribe();
  }
}
