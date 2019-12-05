import { Component, OnInit } from '@angular/core';
import { KiiBlogAbstract } from '../../_kiilib/_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../_kiilib/_services/kii-api-article.service';
import { KiiAinimations } from '../../_kiilib/_utils/kii-animations';
import { KiiApiPageService } from '../../_kiilib/_services/kii-api-page.service';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  animations: KiiAinimations.demo()
})
export class DemoComponent extends KiiBlogAbstract implements OnInit {
  showAnimation : boolean = false;
  constructor(private kiiApiArticle: KiiApiArticleService, 
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService, 
    private device : DeviceDetectorService,
    private router: Router) { super(kiiApiArticle, kiiApiPage, kiiMisc,router); }


  ngOnInit() {
    this.cathegory = "demo";
    this.page="demo";
    this.initialize();
  }

  animate(event : boolean) {
    console.log("Recieved onAppear",event);
    if (!this.device.isMobile())
      this.showAnimation = true;
  }

}
