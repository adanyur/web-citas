import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,} from '@angular/router';
import { Observable } from 'rxjs';
//
import { HttpDataService,StorageService } from '../service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storeService: StorageService, private router: Router,private http:HttpDataService) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const session = this.storeService.isAuthenticated();
    const expired = this.storeService.getTokenExpired();

    if (!session  || expired ) {
      this.storeService.removeSession();
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
