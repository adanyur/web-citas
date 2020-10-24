import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
//
import {
  HttpDataService,
  StorageService,
  MessageService,
} from "../../core/service";
///
import {
  Especialidades,
  Medicos,
  Turnos,
  Horas,
  Iafas,
  DataSend,
} from "../../core/models";

@Component({
  selector: "app-agenda-medica",
  templateUrl: "./agenda-medica.component.html",
  styleUrls: ["./agenda-medica.component.css"],
})
export class AgendaMedicaComponent implements OnInit {
  formularioAgendaMedica: FormGroup;
  turnos$: Observable<Turnos[]>;
  iafas$: Observable<Iafas[]>;
  
  medicos: Medicos[];
  horas: Horas[];
  especialidades: Especialidades[];
  check: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _data: HttpDataService,
    private storage: StorageService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.formularioAgendaMedica = this.fb.group({
      fecha: [null, Validators.required],
      especialidad: [{ value: null, disabled: true }, Validators.required],
      medico: [{ value: null, disabled: true }, Validators.required],
      turno: [{ value: null, disabled: true }, Validators.required],
      hora: [{ value: null, disabled: true }, Validators.required],
      cns: [false],
      correo: [{ value: null, disabled: true }, Validators.required],
      telcel: [{ value: null, disabled: true }, Validators.required],
      iafas: [{ value: null, disabled: true }],
    });
  }

  fecha(data: Date) {
    return new Date(data).getDate() + 1 < new Date().getDate() &&
      new Date(data).getMonth() < new Date().getMonth()
      ? this.message.MessageInfo("La fecha seleccionada es menor a la actual!")
      : this.getSelectFecha(data);
  }

  get formAgendaMedica() {
    return this.formularioAgendaMedica.controls;
  }

  getSelectFecha(fecha: Date) {
    this._data.Especialidades(fecha).subscribe((data) => {
      data["status"] === false
        ? this.message.MessageInfo(data["message"])
        : ((this.especialidades = data),
          this.formAgendaMedica.especialidad.enable());
    });
  }

  getSelectEspecialidad() {
    if (this.formularioAgendaMedica.value.especialidad == "001") {
      this.check = true;
    } else {
      this.check = false;
    }
    this._data.Medicos(this.formularioAgendaMedica.value).subscribe(data=>{
        if (data['status']===false){
          this.message.MessageInfo(data['message'])
          return;
        }
          this.medicos=data;
          this.formAgendaMedica.medico.enable();
      }
    )
  }

  getSelectMedico() {
    this.turnos$ = this._data.Tunos(this.formularioAgendaMedica.value);
    this.formAgendaMedica.turno.enable();
  }

  getSelectTurno() {
    this._data.Horas(this.formularioAgendaMedica.value).subscribe((data) => {
      if (data["status"] === false) {
        this.message.MessageInfo(data["message"]);
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
    this.iafas$ = this._data.Iafas();
  }

  postEnviarDatos() {
    this._data
      .postGenerarCitas(
        new DataSend(this.formularioAgendaMedica.value, this._data.historia)
      )
      .subscribe((data) => {
        this.message.MessageEnvio(data);
        this.storage.removeSession();
        this.Correo(data);
      });
  }

  Correo(data: any) {
    this._data.getCorreo(data).subscribe((data) => console.log(data));
  }
}
