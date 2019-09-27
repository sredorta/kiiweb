import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


export class DiskResult {
    /**Disk total size */
    totalSize : number = 0;

    /**System files size */
    systemSize : number = 0;

    /**removable total file size */
    removableSize : number = 0;

    /**Disk chart */
    disk : any[] = [];


    /**Images chart */
    images : any[] = [];

    /**Videos chart */
    videos : any[] = [];

    /**Removable images Size */
    removableImagesSize : number = 0;

    /**Removable videos Size */
    removableVideosSize : number = 0;

  constructor(obj: any | null) {
    console.log("Recieved from server",obj);
    if (obj) {
        Object.keys(this).forEach(key => {
            if (obj[key] != undefined) 
                this[key] = obj[key];
        });
    } 
  }
}

@Injectable({
  providedIn: 'root'
})

export class KiiApiDiskService {

  constructor(private http: HttpClient) { }

    /**Gets stats */
    public scan() :Observable<any> {
      return this.http.post(environment.apiURL + '/disk/scan', {}).pipe(map(res => new DiskResult(res)));
    }
    /**Gets stats */
    public optimize() :Observable<any> {
        return this.http.post(environment.apiURL + '/disk/optimize', {}).pipe(map(res => new DiskResult(res)));
    }

    /**Gets all videos */
    public getVideos() :Observable<string[]> {
        return this.http.get(environment.apiURL + '/disk/videos/all').pipe(map((res:string[]) => res));
    }
}
