import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
//
import { HttpDataService } from "../../core/service";
//
import { User } from "../../core/models";

@Component({
  selector: "app-dato-paciente",
  templateUrl: "./dato-paciente.component.html",
  styleUrls: ["./dato-paciente.component.css"],
})
export class DatoPacienteComponent implements OnInit {
  paciente$: Observable<User>;
  constructor(private _data: HttpDataService) {}

  ngOnInit(): void {
    this.paciente$ = this._data.Paciente();
  }
}
