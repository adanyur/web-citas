import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { LoginComponent } from './login/login.component';

  const routes :Routes = [
    { path: '', component: LoginComponent },
    { path: 'citas', 
    loadChildren :()=> import('../app/components/components.module').then(m => m.ComponentsModule)
    },
    { path: '**', redirectTo: ''}
  ]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
