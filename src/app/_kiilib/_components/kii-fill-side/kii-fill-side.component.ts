import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kii-fill-side',
  templateUrl: './kii-fill-side.component.html',
  styleUrls: ['./kii-fill-side.component.scss']
})
export class KiiFillSideComponent implements OnInit {

  /**Article key to fill the side */
  @Input() key:string = null;
  
  constructor() { }

  ngOnInit() {
  }

}
