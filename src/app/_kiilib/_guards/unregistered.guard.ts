import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { KiiApiAuthService } from '../_services/kii-api-auth.service';

@Injectable({
  providedIn: 'root'
})

export class UnregisteredGuard implements CanActivate {
  
  constructor(private kiiApiAuth : KiiApiAuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return !this.kiiApiAuth.getLoggedInUserValue().exists();
  }
}
