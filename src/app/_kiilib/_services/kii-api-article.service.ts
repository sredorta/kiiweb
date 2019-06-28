import { Injectable } from '@angular/core';
import { Article } from '../_models/article';
import { KiiServiceAbstract } from '../_abstracts/kii-service.abstract';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KiiApiArticleService extends KiiServiceAbstract<Article> {

  prefix : string = "article";
  constructor(private http: HttpClient) { 
    super(http, "article");
  }

  /**Uploads article image to server */
  public uploadImage(url:string,data:FormData) {
    console.log(data);
    console.log(url);
    return this.http.post<any>(url, data);
  }

  /**Update article in database*/
  public update(element:Article) {
      return this.http.post<Article>(environment.apiURL + '/' + this.prefix + '/update', {article: element}).pipe(map(res => new Article(res)));
  }   



  /**Gets article by key or id */
  public getByIdOrKey(key_or_id:number|string) {
    if (!this._data) return new Article(null);
    if (typeof key_or_id == 'string') {
      return this._data.find(obj => obj.key == key_or_id);
    } else {
        return this._data.find(obj => obj.id == key_or_id);
    }
  }

}
