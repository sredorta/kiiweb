import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kii-stats-indicator',
  templateUrl: './kii-stats-indicator.component.html',
  styleUrls: ['./kii-stats-indicator.component.scss']
})
export class KiiStatsIndicatorComponent implements OnInit {
  @Input() value : number = 0;
  @Input() prev_value : number = 0;
  @Input() size : number = 1;
  @Input() text : string = "";



  constructor() { }

  ngOnInit() {
  }

  getDifferencePercentage() {
    let change = this.value - this.prev_value;
    if (this.prev_value != 0) {
      return Math.round((change/this.prev_value)*100) + '%' ;
    }
  }

  isMore() {
    return this.value>= this.prev_value;
  }

  isLess() {
    return this.value< this.prev_value;
  }

}
