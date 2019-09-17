import { Injectable } from '@angular/core';
import { KiiServiceAbstract } from '../_abstracts/kii-service.abstract';
import { Email } from '../_models/email';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class KiiApiEmailService extends KiiServiceAbstract<Email> {

  prefix : string = "email";
  constructor(private http:HttpClient) { super(http,"email") }


  /**Creates new article in database*/
  public create(data:any) {
      return this.http.post<Email>(environment.apiURL  + '/' + this.prefix + '/create', data).pipe(map(res => new Email(res)));
  }  

  /**Update article in database*/
  public update(element:Email) {
    return this.http.post<Email>(environment.apiURL + '/' + this.prefix + '/update', {email: element}).pipe(map(res => new Email(res)));
  } 
  
  /**Gets the HTML content of the email */
  public preview(data:Email) {
    return this.http.post<any>(environment.apiURL + '/email/preview',{email:data});
  }  

  /**Sends email to myself for testing purposes*/
  public sendToMe(email:Email) {
    return this.http.post<any>(environment.apiURL + '/email/send-test', {email:email});
  }  

  /**Sends email to email address given in to*/
  public sendTo(to:string,additionalHtml:string,email:Email) {
      return this.http.post<any>(environment.apiURL + '/email/send-to', {to:to,additionalHtml:additionalHtml,email:email});
  } 
  /**Sends email to all registered users*/
  public sendToAll(email:Email) {
    return this.http.post<any>(environment.apiURL + '/email/send-to-all', {email:email});
}   

}
