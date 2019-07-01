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
  /*public update(element:Article) {
    return this.http.post<Article>(environment.apiURL + '/' + this.prefix + '/update', {article: element}).pipe(map(res => new Article(res)));
  } */
  
  /**Gets the HTML content of the email */
  public preview(data:Email) {
    return this.http.post<any>(environment.apiURL + '/email/preview',{email:data});
  }  

}
