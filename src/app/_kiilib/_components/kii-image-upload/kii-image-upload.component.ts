import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { KiiApiArticleService } from '../../_services/kii-api-article.service';
import { KiiMiscService } from '../../_services/kii-misc.service';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';

@Component({
  selector: 'kii-image-upload',
  templateUrl: './kii-image-upload.component.html',
  styleUrls: ['./kii-image-upload.component.scss']
})
export class KiiImageUploadComponent extends KiiBaseAbstract implements OnInit {

  /**Contains the current image */
  @Input() image : string = './assets/kiilib/images/no-photo-available.jpg';
  
  /**Maximum file width/height */
  @Input() maxSize : number = 500;

  /**Crop image or not */
  @Input() crop : boolean = true;

  /**Storage to be used for images : content (default), blog */
  @Input() storage : "content" | "blog" | "email" = "content";

  /**Emit link to the uploaded file */
  @Output() onUpload = new EventEmitter<string>();

  /**Image compression rate */
  compression_rate = 0.9;

  /** Contains the current image */
  base64:string = "";

  /**Defines if image has been selected and can be uploaded */
  isUploadable : boolean = false;

  /**Contains original file name loaded */
  fileName : string = "";

  /**Show spinner when loading */
  isLoading:boolean = false;

  /**Shadow canvas for image manipulation */
  @ViewChild('shadowCanvas', {static:false}) shadowCanvasElem : ElementRef; //Shadow canvas for manipulation

  constructor(private kiiApiMisc: KiiMiscService) { super() }

  ngOnInit() {
    this.base64 = this.image; //Initial input image isbeing displayed
  }

  loadImage(event:any) {
    console.log(event.target.files[0])
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.imageToCanvas(reader.result.toString());
        this.fileName = event.target.files[0].name;
        this.isUploadable = true;
      };
    }
  }

  //We create all base64 array and this triggers the update of the list of thumbs
  imageToCanvas(data: string) {
      var obj = this;
      var canvas = this.shadowCanvasElem;
      let myImage = new Image();
      myImage.crossOrigin = "anonymous";
      myImage.src = data;
      myImage.onload = function() {
          if (obj.crop) obj.base64 = obj._resizeAndCropCanvas(myImage,canvas); 
          else obj.base64 = obj._resizeCanvas(myImage,canvas);         
        //Avoid that each time we call the function we redo the resize
        myImage.onload = function() {};
      };
  }

  rotateImage() {
    let obj = this;
    let myImage = new Image();
    myImage.src = this.base64;
    myImage.onload = function () {
      //obj.realImgElem.nativeElement.src = myImage.src;
      let result = obj._rotateImage(myImage,obj.shadowCanvasElem);
      obj.base64 = result;
    };
  }  

  /**When we remove the image */
  removeImage() {
    this.base64 = './assets/kiilib/images/no-photo-available.jpg';
    this.isUploadable = false;
    this.onUpload.emit(null);

  }


  //Give input image and canvas and resizes and returns base64
  private _resizeCanvas(img:HTMLImageElement,canvas:ElementRef) {
    let width : number = 0;
    let height : number = 0;
    var ctx = canvas.nativeElement.getContext("2d");
    if (img.width>this.maxSize || img.height>this.maxSize) {
      if (img.width>img.height) {
        width = this.maxSize;
        height = Math.round(img.height / (img.width / this.maxSize));
        canvas.nativeElement.width = width;
        canvas.nativeElement.height = height;
        ctx.clearRect(0,0,canvas.nativeElement.width, canvas.nativeElement.height);
        ctx.drawImage(img, 0,0, img.width, img.height, 0, 0, width,height);
      } else {
        height = this.maxSize;
        width = Math.round(img.width / (img.height / this.maxSize));
        canvas.nativeElement.width = width;
        canvas.nativeElement.height = height;
        ctx.clearRect(0,0,canvas.nativeElement.width, canvas.nativeElement.height);
        ctx.drawImage(img, 0,0, img.width, img.height, 0, 0, width,height);
      }
    } else {
      canvas.nativeElement.width = img.width;
      canvas.nativeElement.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    return canvas.nativeElement.toDataURL("image/jpeg",this.compression_rate);
  }

  /**Resizes and crops image */
  private _resizeAndCropCanvas(img:HTMLImageElement,canvas:ElementRef) {
    let sourceWidth = img.width;
    let sourceHeight = img.height;
    let sourceSize;
    var ctx = canvas.nativeElement.getContext("2d");

    if (sourceWidth>=sourceHeight) {
      var sourceX = (sourceWidth - sourceHeight)/2;
      var sourceY = 0;
      sourceSize=sourceHeight;
    } else {
        var sourceX = 0;
        var sourceY = (sourceHeight - sourceWidth)/2;
        sourceSize=sourceWidth;
    }    
    canvas.nativeElement.width = this.maxSize;
    canvas.nativeElement.height= this.maxSize;
    ctx.clearRect(0,0,canvas.nativeElement.width, canvas.nativeElement.height);
    ctx.drawImage(img, sourceX,sourceY, sourceSize, sourceSize, 0, 0, this.maxSize,this.maxSize);
   //Disable compression now
    return canvas.nativeElement.toDataURL("image/jpeg",this.compression_rate);
  }

  /** Rotate the image by rotating the canvas */
  private _rotateImage(img:HTMLImageElement, canvas:ElementRef) {
    let angle = Math.PI / 2;
    canvas.nativeElement.width = img.height;
    canvas.nativeElement.height = img.width;
    let ch = canvas.nativeElement.width;
    let cw = canvas.nativeElement.height;
    var ctx = canvas.nativeElement.getContext("2d");
    ctx.clearRect(0,0,canvas.nativeElement.width, canvas.nativeElement.height);
    // translate and rotate
    ctx.translate(canvas.nativeElement.width/2, canvas.nativeElement.height /2);
    ctx.rotate(angle);
    // draw the previows image, now rotated
    var delta = Math.abs(ch-cw)/2;
    if (cw>=ch){
      var origX = -(canvas.nativeElement.width/2) - delta ;
      var origY = -(canvas.nativeElement.height/2) + delta ;
    } else {
      var delta = Math.abs(ch-cw)/2;
      var origX = -(canvas.nativeElement.width/2) + delta;
      var origY = -(canvas.nativeElement.height/2) - delta ;
    } 
    ctx.drawImage(img, 0,0,img.width,img.height,origX,origY,img.width,img.height); 
    return canvas.nativeElement.toDataURL("image/jpeg",1);
  }



  upload() {
    fetch(this.base64).then(res => res.blob()).then(blob => {
      const imageFile = new File([blob], this.fileName, { type: 'image/jpeg' });
      const formData = new FormData();
      formData.append('file',blob,this.fileName);
      //Now upload
      this.isLoading = true;
      this.addSubscriber(
        this.kiiApiMisc.uploadImage('/upload/editor/' + this.storage,formData).subscribe(res => {
          this.onUpload.emit(res.imageUrl);
          this.isLoading = false;
        }, () => this.isLoading = false)
      )

    })

  }
}
