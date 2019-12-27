import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


export class Resource {
    id: number
}

export abstract class KiiServiceAbstract<T extends Resource>  {

    protected _changes$ : BehaviorSubject<Array<T>> = new BehaviorSubject<Array<T>>([]);
    protected _data:  Array<T> = null;

    constructor(private _http: HttpClient, private _prefix:string) { }

    /**When we reload the articles because of lang change... */
    public onChange() {
        return this._changes$;
    }

    /**Sets the data and triggers onChange */
    public set(data: Array<T>) {
        this._data = data;
        this._changes$.next(this._data);
    }

    /**Gets the data stored in memory */
    public get() {
        return this._data;
    }

    /**Loads all elements from http call*/
    public load() {
        return this._http.get<T[]>(environment.apiURL + '/' + this._prefix + '/all')
    }   

    /**Deletes element in database*/
    public delete(element:T) {
        return this._http.post<any>(environment.apiURL + '/' + this._prefix + '/delete', {id:element.id});
    }


    /**Creates new element in database*/
/*    public create(cathegory:string) {
        return this.http.post<Article>(environment.apiURL + '/article/create', {cathegory:cathegory}).pipe(map(res => new Article(res)));
    }*/

    /**Update article in database*/
 /*   public update(element:T) {
        return this._http.post<T>(environment.apiURL + '/' + this._prefix + '/update', {element}).pipe(map(res => new T(res)));
    }   */ 

    /**Removes element from memory and triggers onChange*/
    public splice(element:T) {
        let index = this._data.findIndex(obj => <any>obj.id == <unknown><any>element.id);
        if (index>=0) {
        this._data.splice(index,1);
        this._changes$.next(this._data);
        }
    }


    /**Adds an element at the end of the array in memory and triggers onChange*/
    public addPush(element: T) {
        if (this._data == null) this._data = [];
        this._data.push(element);
        this._changes$.next(this._data);
    }

    /**Adds an element at the begining of the array in memory and triggers onChange*/
    public addUnshift(element: T) {
        if (this._data == null) this._data = [];
        this._data.unshift(element);
        this._changes$.next(this._data);
    }



    /**Updates the element only in memory and triggers onChange */
    public refresh(element:T) {
        let myIndex = this._data.findIndex(obj => obj.id == element.id);
        if (myIndex>=0) {
            this._data[myIndex] = element;
            this._changes$.next(this._data);
        }
    }

  
  }