import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
//
import { AuthService } from "./services/auth.service";
import { StorageService } from "../core/service/storage.service";
import { MessageService } from "../core/service/message.service";
//
import { Session } from "../core/models/session.models";
import { Auth } from "./models/auth.models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  FormLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authServicio: AuthService,
    private storageService: StorageService,
    private router: Router,
    private message: MessageService
  ) {
    this.FormLogin = this.fb.group({
      tipoDocumento: [null, Validators.required],
      dni: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.storageService.getUsers();
  }

  get formLogin() {
    return this.FormLogin.controls;
  }

  SubmitLogin() {
    this.authServicio.Login(new Auth(this.FormLogin.value)).subscribe(
      (data: Session) => this.correctLogin(data),
      (error) => this.message.MessageError(error.name)
    );
  }

  private correctLogin(Session: Session) {
    if (!Session.status) {
      //this.message.MessageError(Session.users);
      this.FormLogin.reset();
      return;
    }
    this.storageService.setSession(Session);
    this.router.navigate(["/citas"]);
  }
}
