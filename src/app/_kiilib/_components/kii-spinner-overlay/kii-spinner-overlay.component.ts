import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'kii-spinner-overlay',
  templateUrl: './kii-spinner-overlay.component.html',
  styleUrls: ['./kii-spinner-overlay.component.scss']
})
export class KiiSpinnerOverlayComponent implements OnInit, OnChanges {

  @Input() show : boolean = true;
  classList= [];
  constructor() { }

  ngOnInit() {
    if (this.show == true)
      this.classList.push('spinner-visible');
  }

  ngOnChanges(changes : SimpleChanges) {
    this.show = changes.show.currentValue; 
    if(this.show == true)
       this.classList.push('spinner-visible');
    else
      this.classList = [];
  }

  visible() : boolean {
    return this.show;
  }
/*
  show() {
    this.show = true;
  }
  hide() {
    this.show = false;
  }*/

}
