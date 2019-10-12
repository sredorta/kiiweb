import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiDiskService, DiskType } from '../../_services/kii-api-disk.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

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

  /**Disk to process videos */
  @Input() disk : DiskType = DiskType.BLOG;

  /**Output with the selected video */
  @Output() video = new EventEmitter<string>();

  constructor(private kiiApiDisk : KiiApiDiskService,@Inject(MAT_DIALOG_DATA) data:any, private http:HttpClient) {
    super();
    this.disk = data.disk;
   }

  ngOnInit() {
    this.getServerVideos();
  }


  //Get all videos from the server
  getServerVideos() {
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiDisk.getVideos().subscribe(res => {
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
        obj.uploadVideo(this.disk,blob);
      };
    }
  }



  uploadVideo(disk:DiskType,blob:Blob) {
    const formData = new FormData();
    formData.append('file',blob,this.fileName);
    const nginxId = Math.random().toString(36).replace(/[^a-z]+/g, '');
    this.isDataLoading=true;
    this.addSubscriber(
      this.kiiApiDisk.uploadVideo(disk,formData).subscribe(res => {
        if (res.status == "completed") {
          this.getServerVideos();
          this.isDataLoading = false;
        }
      }, () => this.isDataLoading = false)
    )
    this.addSubscriber(this.kiiApiDisk.getUploadProgress().subscribe(res => {
      this.progress = res;
    }))
  }

}
