import { Article } from '../_models/article';
import { KiiBaseAbstract } from './kii-base.abstract';
import { KiiApiArticleService } from '../_services/kii-api-article.service';
import { TranslateService } from '@ngx-translate/core';
import { KiiApiPageService } from '../_services/kii-api-page.service';
import { KiiApiSettingService } from '../_services/kii-api-setting.service';
import { KiiMiscService } from '../_services/kii-misc.service';
import { Router } from '@angular/router';

export abstract class KiiBlogAbstract extends KiiBaseAbstract  {

    /**Contains all articles of the given cathegory */
    articles : Article[] = [];

    /**Contains all current displayed articles */
    displayedArticles : Article[] = [];
    
    /**Cathegory of the articles to show */
    cathegory : string = "none";

    /**Current page name for seo */
    page:string = "home";

    /**When we are loading the articles */
    isLoading : boolean = false;

    constructor(
        private _kiiApiArticle: KiiApiArticleService, private _kiiApiPage: KiiApiPageService, private _misc: KiiMiscService, private _router: Router) {
        super();
      }

    protected initialize() {
        //Load all articles and if language is switched we reload them
        this.isLoading = true;
        this.addSubscriber(
          this._kiiApiArticle.onChange().subscribe(res => {
            this.articles = res.filter(obj => obj.cathegory == this.cathegory && obj.public == true);
            this.displayedArticles = this.articles;
            this.isLoading = false;
          }, () => this.isLoading = false)
        )  
        //Apply SEO to the page
        this.addSubscriber(
          this._kiiApiPage.onChange().subscribe(res => {
            let myPage = this._kiiApiPage.getByKey(this.page);
            this._misc.seo(myPage.title,myPage.description,myPage.image, this._router.url);
          })
        )  
      }

}