import { Component, OnInit } from '@angular/core';
import { KiiBlogAbstract } from '../../../_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../../_services/kii-api-article.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { KiiAinimations } from '../../../_utils/kii-animations';
import { LocalizeRouterService } from '../../../_libraries/localize-router';
import { KiiApiPageService } from '../../../_services/kii-api-page.service';
import { KiiMiscService } from '../../../_services/kii-misc.service';
import { Router } from '@angular/router';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Article } from '../../../_models/article';

@Component({
  selector: 'kii-blog',
  templateUrl: './kii-blog.component.html',
  styleUrls: ['./kii-blog.component.scss'],
  animations: KiiAinimations.blog()
})
export class KiiBlogComponent extends KiiBlogAbstract implements OnInit {
  showAnimation : boolean = false;
  currentLang : string; 
  constructor( private localize: LocalizeRouterService,
    private kiiApiArticle: KiiApiArticleService, 
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService,
    private kiiApiLang: KiiApiLanguageService, 
    private device : DeviceDetectorService,
    private router: Router) { super(kiiApiArticle, kiiApiPage, kiiMisc,router); }


  ngOnInit() {
    this.cathegory = "blog";
    this.page="blog";
    this.initialize();
        //Update nice time format language when we change language
        this.addSubscriber(
          this.kiiApiLang.onChange().subscribe(res => {
            this.currentLang = res;
          })
        )
  }

  /**Gets route of article */
  getRoute(articleId:number) {
    return this.localize.translateRoute('/article/'+ articleId);
  }
  animate(event : boolean) {
    if (!this.device.isMobile())
      this.showAnimation = true;
  }

  /**When search results has changes */
  onSearchChanges(displayedArticles:Article[]) {
    this.displayedArticles = displayedArticles;
  }
}
