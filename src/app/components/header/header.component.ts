import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';

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

  /**Do not show video in development */
  showVideo : boolean = false;

  @ViewChild('videoPlayer',{static:false}) videoplayer: ElementRef;


  constructor() { 
  }

  ngOnInit() {
    this.showVideo = environment.production;
    if (!this.data) {
      this.data.title = "Page not found";
      this.data.subtitle = "Provide a page to the header";
    }
    switch (this.data.page) {
      case "home": {
        this.data.title = "home.title";
        this.data.subtitle = "home.subtitle";
        break;
      }
      case "demo": {
        this.data.title = "demo.title";
        this.data.subtitle = "demo.subtitle";
        break;
      }
      case "realisations": {
        this.data.title = "realisations.title";
        this.data.subtitle = "realisations.subtitle";
        break;
      }      
      case "blog": {
        this.data.title = "blog.title";
        this.data.subtitle = "blog.subtitle";
        break;
      }
      case "prix": {
        this.data.title = "prix.title";
        this.data.subtitle = "prix.subtitle";
        break;
      }
      case "contact": {
        this.data.title = "contact.title";
        this.data.subtitle = "contact.subtitle";
        break;
      }
      case "alerts": {
        this.data.title = "alerts.title";
        this.data.subtitle = "alerts.subtitle";
        this.format = "short";
        break;
      }
      case "profile": {
        this.data.title = "profile.title";
        this.format = "short";
        break;
      }      
      case "not-found": {
        this.data.title = "not-found.title";
        this.data.subtitle = "not-found.subtitle";
        this.format = "short";
        break;
      }
      case "login": {
        this.data.title = "login.title";
        this.data.subtitle = "login.subtitle";
        this.format = "short";
        break;
      }     
      case "reset-password": {
        this.data.title = "reset-password.title";
        this.data.subtitle = "reset-password.subtitle";
        this.format = "short";
        break;
      }        
      case "oauth": {
        this.data.title = "oauth.title";
        this.data.subtitle = "oauth.subtitle";
        this.format = "short";
        break;        
      }    
      case "email-validate": {
        this.data.title = "email-validate.title";
        this.data.subtitle = "email-validate.subtitle";
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
