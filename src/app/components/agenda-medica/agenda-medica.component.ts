import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
//
import { HttpDataService } from "src/app/core/service/http-data.service";
import { StorageService } from "src/app/core/service/storage.service";
import { MessageService } from "src/app/core/service/message.service";
///
import { Especialidades } from "../../core/models/especialidades.models";
import { Medicos } from "../../core/models/medicos.models";
import { Turnos } from "src/app/core/models/turnos.models";
import { Horas } from "src/app/core/models/horas.models";
import { Iafas } from "src/app/core/models/iafas.model";
import { DataSend } from "../../core/models/data-send.models";
import { User } from "../../core/models/users.models";
@Component({
  selector: "app-agenda-medica",
  templateUrl: "./agenda-medica.component.html",
  styleUrls: ["./agenda-medica.component.css"],
})
export class AgendaMedicaComponent implements OnInit {
  formularioAgendaMedica: FormGroup;
  medicos$: Observable<Medicos>;
  turnos$: Observable<Turnos>;
  iafas$: Observable<Iafas>;

  horas: Horas;
  especialidades: Especialidades;
  h: string;
  check: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _data: HttpDataService,
    private storage: StorageService,
    private message: MessageService,
    private router: Router
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

  Validacionfecha(data: Date) {
    return new Date(data).getDate() + 1 < new Date().getDate() &&
      new Date(data).getMonth() < new Date().getMonth()
      ? this.message.MessageError(
          "La fecha seleccionada es menor a la fecha actual!"
        )
      : this.getSelectFecha(data);
  }

  get formAgendaMedica() {
    return this.formularioAgendaMedica.controls;
  }

  getSelectFecha(fecha: Date) {
    this._data.Especialidades(fecha).subscribe((data) => {
      data["status"] === false
        ? this.message.MessageError(data["message"])
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

    this.medicos$ = this._data.Medicos(this.formularioAgendaMedica.value);
    this.formAgendaMedica.medico.enable();
  }

  getSelectMedico() {
    this.turnos$ = this._data.Tunos(this.formularioAgendaMedica.value);
    this.formAgendaMedica.turno.enable();
  }

  getSelectTurno() {
    this._data.Horas(this.formularioAgendaMedica.value).subscribe((data) => {
      if (data["status"] === false) {
        this.message.MessageError(data["message"]);
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
      .subscribe(
        (data) => {
          this.message.MessageEnvio(data);
          this.storage.removeSession();
          this.Correo(data);
        },
        (error) => {
          this.message.MessageError(error.name);
        }
      );
  }

  Correo(data: any) {
    this._data.getCorreo(data).subscribe((data) => console.log(data));
  }
}
