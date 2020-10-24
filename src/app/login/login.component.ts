import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
//
import { AuthService } from "./services/auth.service";
import { StorageService, MessageService } from "../core/service";
//
import { Session } from "../core/models";
import { Auth } from "./models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  FormLogin: FormGroup;
  loading = false;
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

  ngOnInit(): void {}

  get formLogin() {
    return this.FormLogin.controls;
  }

  SubmitLogin() {
    this.loading = true;
    this.authServicio.Login(new Auth(this.FormLogin.value)).subscribe(
      (data: Session) => {
        if (!data.status) {
          this.message.MessageInfo(data.messages);
          this.loading = false;
          return;
        }
        this.correctLogin(data);
      },
      (error) => {
        this.loading = false;
        this.message.MessageError(error.name);
      }
    );
  }

  private correctLogin(Session: Session) {
    if (!Session.status) {
      this.FormLogin.reset();
      return;
    }
    this.storageService.setSession(Session);
    this.router.navigate(["/citas"]);
  }
}
