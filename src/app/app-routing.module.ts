import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayaoutComponent } from './components/layaout/layaout.component';

import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'citas', component: LayaoutComponent, canActivate: [AuthGuard] },
  //{ path: 'citas', component: LayaoutComponent },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
