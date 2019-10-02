import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  UrlTree, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { KiiApiAuthService } from '../_services/kii-api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private kiiApiAuth : KiiApiAuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const roles:string[] = next.data.roles as Array<string>;
      //Check that at least one of the required roles exists
      for (let role of roles) {
        if (this.kiiApiAuth.getLoggedInUserValue().hasRole(role)) 
          return true;
      }
      return false;
  }
}
