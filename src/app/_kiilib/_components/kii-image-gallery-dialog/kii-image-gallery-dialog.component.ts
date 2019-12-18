import { Component, OnInit, Input, Output,EventEmitter, Inject, ViewChild} from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiDiskService, DiskType } from '../../_services/kii-api-disk.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSliderChange, MatSlideToggleChange } from '@angular/material';
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
  /**Size of the image */
  size :number = 100;

  /**Max image size to display */
  max : number = 100;

  /**Percentage or units */
  percentage : boolean = true;

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
          this.images = res;
          this.isDataLoading = false;
        },() => this.isDataLoading = false)
      )
  }

  //When a image from the gallery is selected
  onSelect(image:string) {
    let mySize = this.size.toString();
    if (this.percentage) mySize = mySize + "%";
    else mySize = mySize + "px";
    if (this.hasAltText) {
      if (this.altForm.myForm.valid) {
         this.dialogRef.close({url:image, alt:this.altForm.myForm.value.result,size:mySize });
      } else {
        //Show form error
        this.altForm.validate();
      }
    } else {
      this.dialogRef.close({url:image, alt:null, size:mySize});
    }
  }

  onUploadImage(image:string) {
    this.images.push(image);
  }

  onClose() {
    this.dialogRef.close(null);
  }

  onSizeChange(event: MatSliderChange) {
    this.size = event.value;
  }

  onPercentageChange(event: MatSlideToggleChange) {
    this.percentage = event.checked;
    if (this.percentage) this.max= 100;
    else this.max = 300;
  }

}

