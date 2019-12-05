import { Component, OnInit } from '@angular/core';
import { KiiBlogAbstract } from '../../_kiilib/_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../_kiilib/_services/kii-api-article.service';
import { KiiAinimations } from '../../_kiilib/_utils/kii-animations';
import { KiiApiPageService } from '../../_kiilib/_services/kii-api-page.service';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.scss'],
  animations: KiiAinimations.prices()
})
export class PrixComponent extends KiiBlogAbstract implements OnInit {
  showAnimation : boolean = false;
  constructor(private kiiApiArticle: KiiApiArticleService, 
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService, 
    private device : DeviceDetectorService,
    private router: Router) { super(kiiApiArticle, kiiApiPage, kiiMisc,router); }


  ngOnInit() {
    this.cathegory = "prix";
    this.page="prices";
    this.initialize();
  }

  animate(event : boolean) {
    console.log("Recieved onAppear",event);
    if (!this.device.isMobile())
      this.showAnimation = true;
  }
}
