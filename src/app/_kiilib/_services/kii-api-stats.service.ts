import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Stat, StatAction, StatResult } from '../_models/stat';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { KiiPwaService } from './kii-pwa.service';

@Injectable({
  providedIn: 'root'
})

//Handles all stats
export class KiiApiStatsService {
  //private offline$ = new BehaviorSubject<boolean>(false);
  //private offline : boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any,private http: HttpClient) {
/*
    if (isPlatformBrowser(this.platformId)) {
          //Online/Offline detection
          window.addEventListener('online', event => {
            this.offline$.next(false);
          })
          window.addEventListener('offline', event => {
            this.offline$.next(true);
          })
    }
    this.offline$.subscribe(res => {
        this.offline = res;
    })*/
   }

  /**Determines if stats are enabled or not */
  private enabled() {
    if (isPlatformBrowser(this.platformId)) {
       if (localStorage.getItem("cookies") == "true") {
          return true;
          //if (this.offline == false) return true;
       } 
    }
    return false;
  }

  /**Gets session id creating one if doesn't exist */
  private getSessionId() {
    if (sessionStorage.getItem("stats.session")) {
      return sessionStorage.getItem("stats.session");
    } else {
      let number = Math.random();
      number.toString(36); 
      let id = number.toString(36).substr(2, 9);
      id = id + new Date().getTime();
      sessionStorage.setItem("stats.session", id); 
      return id;     
    }
  }

  /**Returns if user has a stats sessionId */
  private hasSessionId() {
    if (sessionStorage.getItem("stats.session")) {
      return true;
    }
    return false;
  }

  /**Clears current sessionId of the stats */
  public clearSession() {
    if (this.enabled())
      sessionStorage.removeItem("stats.session");
  }



  /**Send stats to the server */
  public send(action: StatAction, ressource:string) {
    if (this.enabled()) {
      let myStat = new Stat(null);
      //If there is no sessionId we need to create an extra APP_START event
      if (!this.hasSessionId()) {
        myStat.session = this.getSessionId();
        myStat.ressource = document.referrer;
        myStat.action = StatAction.APP_START;
        this.http.post(environment.apiURL + '/stats/save', {stat:myStat}).subscribe();
        /*if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position)=>{
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            console.log("Found coords !!!! lat:" + latitude + " long:" + longitude);
          });
        }*/
      }
      //Send the event as required
      myStat.session = this.getSessionId();
      myStat.ressource = ressource;
      myStat.action = action;
      this.http.post(environment.apiURL + '/stats/save', {stat:myStat}).subscribe();
    }
  }
  /**Gets stats */
  public analyze(days:number) :Observable<any> {
    return this.http.post(environment.apiURL + '/stats/analyze', {days: days}).pipe(map(res => new StatResult(res)));
  }
  /**Removes all fields */
  public reset() :Observable<any> {
    return this.http.post(environment.apiURL + '/stats/delete', {});
  }

}
