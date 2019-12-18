import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { KiiApiAuthService } from '../_services/kii-api-auth.service';
import { User } from '../_models/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisteredGuard implements CanActivate {
  
  constructor(private kiiApiAuth : KiiApiAuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.kiiApiAuth.getAuthUser().pipe(map(res => {
         let user = new User(res);
         if (user.exists()) return true;
         return false;
      }));
      //return this.kiiApiAuth.getLoggedInUserValue().exists();
  }
}
