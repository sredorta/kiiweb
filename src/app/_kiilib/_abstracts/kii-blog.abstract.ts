import { Article } from '../_models/article';
import { KiiBaseAbstract } from './kii-base.abstract';
import { KiiApiArticleService } from '../_services/kii-api-article.service';
import { TranslateService } from '@ngx-translate/core';

export abstract class KiiBlogAbstract extends KiiBaseAbstract  {

    /**Contains all articles of type blog */
    articles : Article[] = [];
    
    /**Cathegory of the articles to show */
    cathegory : string = "none";

    /**When we are loading the articles */
    isLoading : boolean = false;

    constructor(
        private _kiiApiArticle: KiiApiArticleService) {
        super();
      }

    protected initialize() {
        //Load all articles and if language is switched we reload them
        this.isLoading = true;
        this.addSubscriber(
          this._kiiApiArticle.onChange().subscribe(res => {
            this.articles = res.filter(obj => obj.cathegory == this.cathegory && obj.public == true);
            this.isLoading = false;
          }, () => this.isLoading = false)
        )  
      }

}