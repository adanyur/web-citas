import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
//
import { HttpDataService } from "src/app/core/service/http-data.service";
//
import { User } from "../../core/models/users.models";
import { StorageService } from "../../core/service/storage.service";

@Component({
  selector: "app-dato-paciente",
  templateUrl: "./dato-paciente.component.html",
  styleUrls: ["./dato-paciente.component.css"],
})
export class DatoPacienteComponent implements OnInit {
  paciente$: Observable<User>;
  constructor(
    private _data: HttpDataService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.paciente$ = this._data.Paciente();
  }
}
