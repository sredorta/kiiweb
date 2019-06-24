import {HttpClient} from '@angular/common/http';
import {TranslateLoader} from '@ngx-translate/core';
import {makeStateKey, StateKey, TransferState} from '@angular/platform-browser';
import {Observable, forkJoin, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import * as merge from 'deepmerge';


export interface ITranslationResource {
  prefix: string;
  suffix: string;
}
export class KiiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    private resources: ITranslationResource[] = [
        {prefix:"./assets/kiilib/i18n/", suffix:".json"},
        {prefix:"./assets/i18n/", suffix:".json"}
    ],

  ) {}

  public getTranslation(lang: string): Observable<any> {
    const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
    const data = this.transferState.get(key, null);
    // First we are looking for the translations in transfer-state, if none found, http load as fallback
    if (data) {
        return Observable.create(observer => {
          observer.next(data);
          observer.complete();
        });
    } else {
        const requests = this.resources.map(resource => {
        const path = resource.prefix + lang + resource.suffix;
        return this.http.get(path).pipe(catchError(res => {
            console.error("Could not find translation file:", path);
            return of({});
        }));
        });
        return forkJoin(requests).pipe(map(response => merge.all(response)));
    }
  }
}