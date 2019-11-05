import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { KiiServiceAbstract } from '../_abstracts/kii-service.abstract';
import { Page, IPage} from '../_models/page';
import {map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KiiApiPageService extends KiiServiceAbstract<Page> {

  prefix : string = "page";
  constructor(private http: HttpClient) { 
    super(http, "page");
  }

  /**Update page in database : kubiiks rights required*/
  public update(element:Page) {
      return this.http.post<Page>(environment.apiURL + '/' + this.prefix + '/update', {page: element}).pipe(map(res => new Page(res)));
  }   

  /**Gets value of desired setting by giving it's key */
  public getByKey(page_name:string) {
      if (!this._data) return new Page(null);
      let page = this._data.find(obj => obj.page == page_name);
      if (!page) return new Page(null);
      return page;
  }  

}
