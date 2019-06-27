import { Injectable } from '@angular/core';
import { User, IUser } from '../_models/user';
import { KiiServiceAbstract } from '../_abstracts/kii-service.abstract';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { IRole } from '../_models/role';

@Injectable({
  providedIn: 'root'
})
export class KiiApiUserService extends KiiServiceAbstract<User> {

  prefix :string = "user";
  constructor(private http : HttpClient) { super(http, "user") }

  /** Gets all possible roles available. Admin rights required */
  public getAllRoles() :Observable<IRole[]> {
      return this.http.get(environment.apiURL + '/role/all').pipe(map(res => <IRole[]>res));
  }  

  /**Attaches a certain role to a user */
  public attachRole(userId:number, roleId:number) :Observable<IUser> {
    return this.http.post(environment.apiURL + '/role/attach', {userId: userId, roleId: roleId}).pipe(map(res => <IUser>res));
  }

  /**Detaches a certain role from a user */
  public detachRole(userId:number, roleId:number) :Observable<IUser> {
    return this.http.post(environment.apiURL + '/role/detach', {userId: userId, roleId: roleId}).pipe(map(res => <IUser>res));
  }  

  /**Update setting in database*/
  public update(element:IUser) {
    return this.http.post<User>(environment.apiURL + '/' + this.prefix + '/update', {user: element}).pipe(map(res => new User(res)));
  } 

}
