import { Directive, HostListener, Renderer2, ElementRef, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Directive({
  selector: '[kiiScroll]'
})
export class KiiScrollDirective {
  /**Emits when element appears */
  @Output() onAppear:EventEmitter<boolean> = new EventEmitter();

  scrollTop : number = 0;
  windowHeight : number =0;
  appearDone : boolean = false;
  elementPosY: number;
  elementHeight: number;
  constructor(private _renderer: Renderer2,
              private _element: ElementRef,@Inject(PLATFORM_ID) private platformId   
              ) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
        document.getElementById('kii-app-main-container').addEventListener('scroll', this.scroll, true); //third parameter
        window.addEventListener('resize', this.resize,true);
        this.windowHeight = window.innerHeight;
    } else {
      this.onAppear.emit(true);  //If we are on server we tell we have appeared
    }

  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('kii-app-main-container').removeEventListener('scroll', this.scroll, true);
      window.removeEventListener('resize', this.resize,true);
    }
  }  

  scroll = (element:any): void => {
      if (element && element.srcElement && element.srcElement.scrollTop) {
        this.scrollTop = element.srcElement.scrollTop;
        if (element.srcElement.scrollTop>300) {
          this._renderer.addClass(this._element.nativeElement, 'kii-scrolled');
        } else {
          this._renderer.removeClass(this._element.nativeElement, 'kii-scrolled');
        }
        this.saveDimensions();
        if (this.isVisible() == true) {
            if (!this.appearDone) {
              this._renderer.addClass(this._element.nativeElement, 'kii-appear');
              this.onAppear.emit(true);
              this.appearDone = true;
              //Remove listeners
              document.getElementById('kii-app-main-container').removeEventListener("scroll", this.scroll);
              window.removeEventListener('resize', this.resize,true);
            }
        }
      }
  };

  resize = ():void => {
      this.windowHeight = window.innerHeight;
  }
  saveDimensions() {
    this.elementPosY = this.getOffsetTop(this._element.nativeElement);
    this.elementHeight = this._element.nativeElement.offsetHeight;
  }
  //Recursively get absolute offset from top
  getOffsetTop(element: any){
    let offsetTop = element.offsetTop || 0;
    if(element.offsetParent){
      offsetTop += this.getOffsetTop(element.offsetParent);
    }
    return offsetTop;
  }

  isVisible(){
    return this.scrollTop >= this.elementPosY || (this.scrollTop + window.innerHeight) >= (this.elementPosY + this.elementHeight);
  }
}
