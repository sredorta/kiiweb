import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiDiskService } from '../../_services/kii-api-disk.service';
import { KiiMiscService } from '../../_services/kii-misc.service';

@Component({
  selector: 'kii-video-gallery',
  templateUrl: './kii-video-gallery.component.html',
  styleUrls: ['./kii-video-gallery.component.scss']
})
export class KiiVideoGalleryComponent extends KiiBaseAbstract implements OnInit {

  /**Contains current loaded videos in the server */
  videos : string[] = [];
  isDataLoading : boolean = false;
  /**Upload progress */
  progress:number = 0;

  fileName:string = "";

  /**Output with the selected video */
  @Output() video = new EventEmitter<string>();

  constructor(private kiiApiDisk : KiiApiDiskService,private kiiApiMisc: KiiMiscService) {super() }

  ngOnInit() {
    this.getServerVideos();
  }


  //Get all videos from the server
  getServerVideos() {
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiDisk.getVideos().subscribe(res => {
        console.log("List of videos",res);
        this.videos = res;
        this.isDataLoading = false;
      },() => this.isDataLoading = false)
    )
  }

  //When a video from the gallery is selected
  onSelect(video:string) {
    this.video.emit(video);
  }



  loadVideo(event) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.isDataLoading = true;
      reader.readAsArrayBuffer(file);
      let tmp = file.name.split('.');
      this.fileName = tmp[0] + "__" + new Date().getTime() + '.' + tmp[1];
      let obj = this;
      reader.onloadend = () => {
        let blob = new Blob([reader.result]);
        obj.uploadVideo(blob);
      };
    }
  }

  uploadVideo(blob:Blob) {
    const formData = new FormData();
    formData.append('file',blob,this.fileName);

    this.addSubscriber(
      this.kiiApiMisc.uploadVideo('/upload/videos/content',formData).subscribe(res => {
        if (res.status == "progress") {
          this.progress = res.message;
        } 
        if (res.status == "completed") {
          this.isDataLoading = false;
          setTimeout(() => this.progress = 0,200);
        }
      }, () => this.isDataLoading = false)
    )
  }

}
