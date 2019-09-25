import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


/**Enumerator with type of analyze*/
export enum DiskType {
  IMAGES = "images",
  //APP_START = "app_start",
}

@Injectable({
  providedIn: 'root'
})

export class KiiApiDiskService {

  constructor(private http: HttpClient) { }

    /**Gets stats */
    public scan(type:DiskType) :Observable<any> {
      return this.http.post(environment.apiURL + '/disk/scan', {type: type});//.pipe(map(res => new StatResult(res)));
    }
}
