import { Component, OnInit, Input, Output,EventEmitter, Inject} from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiDiskService, DiskType } from '../../_services/kii-api-disk.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  maxSize : number = 1024;

  constructor(private kiiApiDisk: KiiApiDiskService,
              private dialogRef:MatDialogRef<KiiImageGalleryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data:any) { 
                super(); 
                this.disk = data.disk;
              }

  ngOnInit() {
    this.getServerImages();
    console.log("DATA ON DIALOG:", this.disk)
    switch(this.disk) {
      case(DiskType.EMAIL): {
        this.maxSize = 600;
        break;
      }
      default: {
        this.maxSize = 1024;
      }
    }
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

