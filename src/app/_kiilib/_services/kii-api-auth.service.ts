import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import { IUser, User } from '../_models/user';

export interface IOauth2 {
  /**Tells if the user has all fields */
  complete:boolean,
  /**Current user details */
  user: IUser
}

@Injectable({
  providedIn: 'root'
})
export class KiiApiAuthService {

  /** Contains current loggedIn user */
  private _user = new BehaviorSubject<User>(new User(null)); //Stores the current user

  constructor(private http: HttpClient) { }

  /** Login user using local passport */
  public login(credentials:any) {
    return this.http.post<any>(environment.apiURL + '/auth/login', credentials);
  }

  /** Signup user using local passport */
  public signup(credentials:any) {
    if (credentials.passwordConfirm)
      credentials.passwordConfirm = null;
    return this.http.post<any>(environment.apiURL + '/auth/signup', credentials);
  }

  /** Reset password */
  public resetpassword(value:any) {
    return this.http.post<any>(environment.apiURL + '/auth/reset-password/email', value);
  }

  /** Validate if oauth2 login has all required fields of signup */
  public oauth2Validate() {
    return this.http.get(environment.apiURL + '/auth/oauth2/validate').pipe(map(res => <IOauth2>res));;
  }

  /** Validate if oauth2 login has all required fields of signup */
  public oauth2Update(user:IUser) :Observable<IUser> {
    return this.http.post<IUser>(environment.apiURL + '/auth/oauth2/update', user).pipe(map(res => <IUser>res));;
  }

  /**Validate email account by providing id and key */
  public validateEmail(params:any) {
    return this.http.post<any>(environment.apiURL + '/auth/validate-email',{id:params.id,key:params.key});
  }


  /**Sets current loggedIn user */
  public setLoggedInUser(user:User) {
    console.log("setLoggedInUser: Setting user value");
    console.log(user);
    console.log("----------------------------------");
    this._user.next(user);
  }

  /**Gets current loggedIn user as an observable */
  public getLoggedInUser() {
    return this._user;
  }

  /** getAuthUser expects that we send the bearer token and will return the current user details */
  public getAuthUser() {
    return this.http.get(environment.apiURL + '/auth/get').pipe(map(res => <IUser>res));
  }

  /**Updates current user. Only need to be registered */
  public updateAuthUser(value:any) {
      return this.http.post(environment.apiURL + '/auth/update', value).pipe(map(res => <IUser>res));
  }

  /**Removes current user. Only need to be registered */
  public deleteAuthUser() {
    return this.http.delete(environment.apiURL + '/auth/delete');
  }  
  
  public sendEmail(value:any) {
    return this.http.post<any>(environment.apiURL + '/auth/send-email', value);
  }

}
