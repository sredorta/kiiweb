import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { KiiFormAbstract } from '../../_abstracts/kii-form.abstract';
import { Validators } from '@angular/forms';

@Component({
  selector: 'kii-video-gallery-dialog',
  templateUrl: './kii-video-gallery-dialog.component.html',
  styleUrls: ['./kii-video-gallery-dialog.component.scss']
})
export class KiiVideoGalleryDialogComponent  implements OnInit {
  validator : Validators;
  constructor(private dialogRef: MatDialogRef<KiiVideoGalleryDialogComponent>) { }

  ngOnInit() {
    this.validator = Validators.compose([
      Validators.pattern("https://youtu.be/.*"),
    ]);
  }

  onClose() {
    this.dialogRef.close(null);
  }

  //When a video from the gallery has been selected
  onVideoFromGallery(video:string) {
    console.log("We got event from gallery", video);
    this.dialogRef.close(video);
  }
  //When youtube has been selected
  onYouTube(video:any) {
    this.dialogRef.close(video.result);
  }

}
