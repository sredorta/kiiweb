import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core';

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

  @ViewChild('videoPlayer',{static:false}) videoplayer: ElementRef;


  constructor() { 
  }

  ngOnInit() {
    console.log("RECIEVED DATA", this.data);
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
      default: {
        this.data.title = "Page not found";
        this.data.subtitle = "Provide a page to the header";
      }
    }
  }

  ngAfterViewInit() {
    console.log(this.videoplayer);
    this.video = this.videoplayer.nativeElement;
    this.video.oncanplaythrough = () => {
      console.log("CAN PLAY THROUGH !!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
    this.video.onplaying = () => {
      this.isPlaying = true;
      console.log("IS PLAYING  !!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    }
    console.log("CANPLAY TYPE:",this.video.canPlayType('video/mp4'));

    /*this.video = this.videoplayer.nativeElement;
    console.log("VIDEO:", this.video);
    this.video.onloadend = () => {
      console.log("VIDEO ENDED LOADING");
      this.isVideoLoading = false;
    } */

    /*console.log(this.videoplayer);

    let myObj = this;
    this.videoplayer.nativeElement.onplay = () => {
      this.isVideoPlaying = true;
    }
      this.videoplayer.nativeElement.onloadeddata = () => {
        console.log("Loaded video !!!");
        if (!myObj.isVideoPlaying)
          myObj.playVideo();
      };*/
  }

  test(event:any) {
    console.log("GOT CANRUNTRHIGAAD S: ", event);
  }


}
