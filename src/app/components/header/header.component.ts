import { Component, OnInit, Input, ViewChild, ElementRef, NgZone, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { environment } from '../../../environments/environment';
import {DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformBrowser } from '@angular/common';
import * as merge from 'deepmerge';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /**Input data of the header */
  @Input() data : any = null;

  /**Tells if video can be played or fallback */
  canPlayVideo : boolean = false;

  /**Tells if video is active */
  isPlaying : boolean = false;
  video : HTMLVideoElement = null;

  /**Tells which format to display*/
  format : string ="default";

  /**Do not show video in development or on server side*/
  showVideo : boolean = false;

  /**Checks if user is on a mobile device */
  isMobile : boolean = this.device.isMobile();

  /**Muted version of data */
  myData : any = {};

  @ViewChild('videoPlayer',{static:false}) videoplayer: ElementRef;


  constructor(
    private device : DeviceDetectorService, 
    @Inject(PLATFORM_ID) private platformId: any) { 
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.data.currentValue.alertCount) {
        this.myData.alertCount = changes.data.currentValue.alertCount;
    }
    if (changes.data.currentValue.title) {
      this.myData.title = changes.data.currentValue.title;
    }
    if (changes.data.currentValue.subtitle) {
      this.myData.subtitle = changes.data.currentValue.subtitle;
    }
  }

  ngOnInit() {
    this.myData = JSON.parse(JSON.stringify(this.data));
    console.log("DATA IS:", this.myData);
    this.showVideo = environment.production && isPlatformBrowser(this.platformId);
    if (!this.myData) {
      this.myData.title = "Page not found";
      this.myData.subtitle = "Provide a page to the header";
    }
    switch (this.myData.page) {
      case "home": {
        this.myData.title = "home.title";
        this.myData.subtitle = "home.subtitle";
        break;
      }
      case "demo": {
        this.myData.title = "demo.title";
        this.myData.subtitle = "demo.subtitle";
        break;
      }
      case "realisations": {
        this.myData.title = "realisations.title";
        this.myData.subtitle = "realisations.subtitle";
        break;
      }      
      case "blog": {
        this.myData.title = "blog.title";
        this.myData.subtitle = "blog.subtitle";
        break;
      }
      case "prix": {
        this.myData.title = "prix.title";
        this.myData.subtitle = "prix.subtitle";
        break;
      }
      case "contact": {
        this.myData.title = "contact.title";
        this.myData.subtitle = "contact.subtitle";
        break;
      }
      case "alerts": {
        this.myData.title = "alerts.title";
        this.myData.subtitle = "alerts.subtitle";
        this.format = "short";
        break;
      }
      case "profile": {
        this.myData.title = "profile.title";
        this.format = "short";
        break;
      }      
      case "not-found": {
        this.myData.title = "not-found.title";
        this.myData.subtitle = "not-found.subtitle";
        this.format = "short";
        break;
      }
      case "login": {
        this.myData.title = "login.title";
        this.myData.subtitle = "login.subtitle";
        this.format = "short";
        break;
      }     
      case "reset-password": {
        this.myData.title = "reset-password.title";
        this.myData.subtitle = "reset-password.subtitle";
        this.format = "short";
        break;
      }        
      case "oauth": {
        this.myData.title = "oauth.title";
        this.myData.subtitle = "oauth.subtitle";
        this.format = "short";
        break;        
      }    
      case "email-validate": {
        this.myData.title = "email-validate.title";
        this.myData.subtitle = "email-validate.subtitle";
        this.format = "short";
        break;        
      }  
      case "article": {
        //this.data.title = "article.title";
        //this.data.subtitle = "article.subtitle";
        this.format = "short";
        break;        
      }        
      default: {
        this.data.title = "Page not found";
        this.data.subtitle = "Provide a page to the header";
      }
    }
  }

  ngAfterViewInit() {
    if (this.showVideo) {
      this.video = this.videoplayer.nativeElement;
      this.video.oncanplaythrough = () => {
      }
      this.video.onplaying = () => {
        this.isPlaying = true;
      }
    }
  }
}
