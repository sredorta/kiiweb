import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiDiskService, DiskType } from '../../_services/kii-api-disk.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'kii-image-gallery-dialog',
  templateUrl: './kii-image-gallery-dialog.component.html',
  styleUrls: ['./kii-image-gallery-dialog.component.scss']
})
export class KiiImageGalleryDialogComponent extends KiiBaseAbstract implements OnInit {

  isDataLoading : boolean = false;
  images:string[] = [];

  @Input() disk : DiskType = DiskType.BLOG;
  @Output() image = new EventEmitter<string>();

  constructor(private kiiApiDisk: KiiApiDiskService,private dialogRef:MatDialogRef<KiiImageGalleryDialogComponent>) { super(); }

  ngOnInit() {
    this.getServerImages();
  }

  //Get all images from the server
  getServerImages() {
      this.isDataLoading = true;
      this.addSubscriber(
        this.kiiApiDisk.getImages(this.disk).subscribe(res => {
          console.log("List of images",res);
          this.images = res;
          this.isDataLoading = false;
        },() => this.isDataLoading = false)
      )
  }

  //When a image from the gallery is selected
  onSelect(image:string) {
    console.log("Emitting :",image);
    this.image.emit(image);
    //Close the dialog sending the selected image
    this.dialogRef.close(image);

  }

  onUploadImage(image:string) {
    this.images.push(image);
  }

}

