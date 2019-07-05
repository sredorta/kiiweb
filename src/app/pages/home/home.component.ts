import { Component, OnInit } from '@angular/core';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
//import { Socket } from 'ngx-socket-io';
import { KiiChatService } from '../../_kiilib/_services/kii-chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private KiiMisc: KiiMiscService) { }

  ngOnInit() {
  }


}
