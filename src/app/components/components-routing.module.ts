import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayaoutComponent } from './layaout/layaout.component'

import {AuthGuard} from '../core/guard/auth.guard'

const routes: Routes = [
  { path:'', component: LayaoutComponent ,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
