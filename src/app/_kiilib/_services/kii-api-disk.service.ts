import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

export enum DiskType {
  CONTENT = "content",
  EMAIL = "email",
  BLOG = "blog",
  DEFAULT = "defaults",
  ALL = ""
}

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
    /**Gets all images */
    public getImages(disk:DiskType) :Observable<string[]> {
      return this.http.post(environment.apiURL + '/disk/images/all', {disk:disk}).pipe(map((res:string[]) => res));
    }  
    
    /**Uploads image to the specific disk */
    public uploadImage(disk:DiskType,data:FormData) {
      console.log("Uploading image through:", environment.apiURL + '/disk/images/upload/'+disk);
      return this.http.post(environment.apiURL + '/disk/images/upload/'+disk, data, {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {
  
        switch (event.type) {
  
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return { status: 'completed', message:event.body};
          default:
            return {status: 'unhandled',message:event.type};
          
        }
      })
      );
    }    

    /**Uploads video */
    public uploadVideo(disk:DiskType,data:FormData) {
      return this.http.post<any>(environment.apiURL + '/disk/videos/upload/'+disk, data, {
        reportProgress: true,
        observe: 'events'
      }).pipe(map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };
          case HttpEventType.Response:
            return { status: 'completed', message:event.body};
          default:
            return {status: 'unhandled',message:event.type};
        }
      })
      );
    }
}
