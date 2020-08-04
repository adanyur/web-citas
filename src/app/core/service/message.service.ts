import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  constructor(private router: Router, private storageService: StorageService) {}

  MessageError(error: string) {
    Swal.fire({ icon: "error", title: error });
  }

  MessageEnvio(data: any) {
    Swal.fire({
      title: "Enviando los datos",
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
        swalWithBootstrapButtons.fire(data[0].msj_status, "", "success");
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
