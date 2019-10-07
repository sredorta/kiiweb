import { Directive, HostListener, Renderer2, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[kiiScroll]'
})
export class KiiScrollDirective {

  constructor(private _renderer: Renderer2,
              private _element: ElementRef,@Inject(PLATFORM_ID) private platformId   
              ) { console.log("Constructed KIISCROLL !!!!!!!!!!!!!!!!") }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId))
        document.getElementById('kii-app-main-container').addEventListener('scroll', this.scroll, true); //third parameter
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId))
      document.getElementById('kii-app-main-container').removeEventListener('scroll', this.scroll, true);
  }  

  scroll = (element:any): void => {
    if (element && element.srcElement && element.srcElement.scrollTop) {
      console.log(element.srcElement.scrollTop)
      if (element.srcElement.scrollTop>20) {
        this._renderer.addClass(this._element.nativeElement, 'kii-scrolled');
      } else {
        this._renderer.removeClass(this._element.nativeElement, 'kii-scrolled');
      }
    }
  };

}
