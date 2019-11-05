import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kii-header',
  templateUrl: './kii-header.component.html',
  styleUrls: ['./kii-header.component.scss']
})
export class KiiHeaderComponent implements OnInit {

  @Input() data :any = null;

  constructor() {}

  ngOnInit() {
  }

}
