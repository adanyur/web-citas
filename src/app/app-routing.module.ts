import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LayaoutComponent } from "./components/layaout/layaout.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "citas", component: LayaoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
