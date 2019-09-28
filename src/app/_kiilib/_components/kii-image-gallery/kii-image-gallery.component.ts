import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiDiskService } from '../../_services/kii-api-disk.service';

@Component({
  selector: 'kii-image-gallery',
  templateUrl: './kii-image-gallery.component.html',
  styleUrls: ['./kii-image-gallery.component.scss']
})
export class KiiImageGalleryComponent extends KiiBaseAbstract implements OnInit {

  isDataLoading : boolean = false;
  images:string[] = [];

  @Output() image = new EventEmitter<string>();

  constructor(private kiiApiDisk: KiiApiDiskService) { super(); }

  ngOnInit() {
    this.getServerImages();
  }

  //Get all images from the server
  getServerImages() {
      this.isDataLoading = true;
      this.addSubscriber(
        this.kiiApiDisk.getImages().subscribe(res => {
          console.log("List of images",res);
          this.images = res;
          this.isDataLoading = false;
        },() => this.isDataLoading = false)
      )
  }

  //When a image from the gallery is selected
  onSelect(image:string) {
      this.image.emit(image);
  }

  onUploadImage(image:string) {
    this.images.push(image);
  }

}
