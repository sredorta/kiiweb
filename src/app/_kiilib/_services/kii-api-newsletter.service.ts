import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KiiApiNewsletterService {

  constructor(private http:HttpClient) { }

   /**Update article in database*/
   public subscribeNews(email:string) {
    return this.http.post<any>(environment.apiURL + '/newsletter/subscribe', {email: email});
  } 
   /**Update article in database*/
   public unsubscribeNews(email:string) {
    return this.http.post<any>(environment.apiURL + '/newsletter/unsubscribe', {email: email});
  } 

}

