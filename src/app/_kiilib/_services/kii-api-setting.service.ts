import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { KiiServiceAbstract } from '../_abstracts/kii-service.abstract';
import { Setting, ISetting} from '../_models/setting';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KiiApiSettingService extends KiiServiceAbstract<Setting> {

  prefix : string = "setting";
  constructor(private http: HttpClient) { 
    super(http, "setting");
  }
  
  /**Gets value of desired setting by giving it's key */
  public getByKey(key:string) {
      if (!this._data) return new Setting(null);
      let setting = this._data.find(obj => obj.key == key);
      if (!setting) return new Setting(null);
      return this._data.find(obj => obj.key == key);
  }  

}
