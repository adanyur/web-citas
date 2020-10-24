import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(private router: Router, private storageService: StorageService) {}

  MessageError(error: string) {
    const message = `<h4>${error}</h4>`;
    Swal.fire({ icon: "error", title: message });
  }

  MessageInfo(info: string) {
    const message = `<h4>${info}</h4>`;
    Swal.fire({ icon: "info", title: message });
  }

  MessageEnvio(mensaje: any) {
    const message = `<h4>${mensaje}</h4>`;
    Swal.fire({
      title: "<h4>¡¡Generando citas!!</h4>",
      timer: 2000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
      onClose: () => {},
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: { confirmButton: "btn btn-success" },
          buttonsStyling: false,
        });
        swalWithBootstrapButtons.fire({ icon: "success", title: message });
      }
      this.router.navigate([""]);
    });
  }

  MessageSession() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: { confirmButton: "btn btn-success" },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire("Excedio el tiempo permitido", "", "success")
      .then((result) => {
        if (result.value == true) {
          this.storageService.removeSession();
          this.router.navigate([""]);
        }
      });
  }
}
