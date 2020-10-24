import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
//
import { StorageService } from "../service/storage.service";
@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private storeService: StorageService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const session = this.storeService.getToken();

    if (!session) {
      this.router.navigate([""]);
      return false;
    }

    return true;
  }
}
