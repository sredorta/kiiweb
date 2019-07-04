import { Injectable } from '@angular/core';
import { KiiServiceAbstract } from '../_abstracts/kii-service.abstract';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../_models/alert';
import { environment } from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KiiApiAlertService extends KiiServiceAbstract<Alert> {

  prefix : string = "alert";
  constructor(private http: HttpClient) { 
    super(http, "alert");
  }

  /**Update alert in database*/
  public update(element:Alert) {
    return this.http.post<any>(environment.apiURL + '/' + this.prefix + '/update', {alert: element});//.pipe(map(res => new Alert(res)));
  }   

}
