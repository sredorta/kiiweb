import { Component, OnInit, Input, Output,EventEmitter, Inject, ViewChild} from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiDiskService, DiskType } from '../../_services/kii-api-disk.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators } from '@angular/forms';
import { KiiItemFormComponent } from '../_forms/kii-item-form/kii-item-form.component';

@Component({
  selector: 'kii-image-gallery-dialog',
  templateUrl: './kii-image-gallery-dialog.component.html',
  styleUrls: ['./kii-image-gallery-dialog.component.scss']
})
export class KiiImageGalleryDialogComponent extends KiiBaseAbstract implements OnInit {

  isDataLoading : boolean = false;
  images:string[] = [];
  validator : Validators;

  hasAltText : boolean = true;
  @Input() disk : DiskType = DiskType.BLOG;
  @Output() image = new EventEmitter<string>();
  @ViewChild(KiiItemFormComponent, {static:false}) altForm : KiiItemFormComponent;

  maxSize : number = 1024;

  constructor(private kiiApiDisk: KiiApiDiskService,
              private dialogRef:MatDialogRef<KiiImageGalleryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data:any) { 
                super(); 
                this.disk = data.disk;
                this.hasAltText = data.hasAltText;
              }

  ngOnInit() {
    this.validator = Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ]);
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
    if (this.hasAltText) {
      if (this.altForm.myForm.valid) {
         this.dialogRef.close({url:image, alt:this.altForm.myForm.value.result});
      }
    } else {
      this.dialogRef.close({url:image, alt:null});
    }
  }

  onUploadImage(image:string) {
    this.images.push(image);
  }

}

