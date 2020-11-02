import { Component , OnInit } from '@angular/core';
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
  horas$: Observable<Horas[]>;
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
   this.especialidadesSub = this.data.Especialidades(fecha).subscribe((data) => {
      data[this.status] === false ? this.message.MessageInfo(data[this.messages]) :
      ((this.especialidades = data), this.form.especialidad.enable());
    });
  }

  getSelectEspecialidad() {
      this.check = this.formularioAgendaMedica.value.especialidad === '001' ? true : false;
      this.medicosSub = this.data.Medicos( this.formularioAgendaMedica.value ).subscribe((data) => {
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
    this.turnosSub = this.data.Tunos(this.formularioAgendaMedica.value).subscribe(data=>{
        if (data[this.status] === false){
          this.message.MessageInfo(data[this.messages])
        }
      this.turnos=data;
      this.form.turno.enable();
    })
  }

  getSelectTurno() {
   this.horas$ = this.data.Horas(this.formularioAgendaMedica.value);
   this.form.hora.enable();
   this.form.correo.enable();
   this.form.telcel.enable();
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
    this.data.postGenerarCitas(new DataSend(this.formularioAgendaMedica.value, this.data.historia))
      .subscribe((data) => {
        console.log(data);
        this.Correo(data);
        this.message.MessageEnvio(data);
        this.storage.removeSession();
      });
  }

  Correo(data: any) {
    this.data.getCorreo(data).subscribe((response) => console.log(response));
  }


  OnDestroy() {
    this.medicosSub.unsubscribe();
    this.turnosSub.unsubscribe();
    this.especialidadesSub.unsubscribe();
  }
}
