import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LayaoutComponent } from './layaout/layaout.component';
import { AgendaMedicaComponent } from './agenda-medica/agenda-medica.component';
import { DatoPacienteComponent } from './dato-paciente/dato-paciente.component';

import { ComponentsRoutingModule } from './components-routing.module';


@NgModule({
  declarations: [
    AgendaMedicaComponent,
    DatoPacienteComponent,
    LayaoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
