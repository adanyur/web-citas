import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from './components/components.module';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor , multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
