import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { KiiBlogAbstract } from '../../_kiilib/_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../_kiilib/_services/kii-api-article.service';
import { KiiAinimations } from '../../_kiilib/_utils/kii-animations';
import { KiiApiPageService } from '../../_kiilib/_services/kii-api-page.service';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  animations: KiiAinimations.demo()
})
export class DemoComponent extends KiiBlogAbstract implements OnInit {
  showAnimation : boolean = false;
  isBrowser : boolean = false;
  constructor(private kiiApiArticle: KiiApiArticleService, 
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService, 
    private device : DeviceDetectorService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router) { 
      super(kiiApiArticle, kiiApiPage, kiiMisc,router); 
      if (isPlatformBrowser(this.platformId)) this.isBrowser = true;
    }


  ngOnInit() {
    this.cathegory = "demo";
    this.page="demo";
    this.initialize();
  }

  animate(event : boolean) {
    if (!this.device.isMobile())
      this.showAnimation = true;
  }

}
