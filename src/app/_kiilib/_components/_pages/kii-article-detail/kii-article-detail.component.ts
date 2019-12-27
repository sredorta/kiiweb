import { Component, OnInit } from '@angular/core';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';
import { ActivatedRoute, Router } from '@angular/router';
import { KiiApiArticleService } from '../../../_services/kii-api-article.service';
import { Article } from '../../../_models/article';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { KiiMiscService } from '../../../_services/kii-misc.service';
import { LocalizeRouterService } from '../../../_libraries/localize-router/localize-router.service';

@Component({
  selector: 'kii-article-detail',
  templateUrl: './kii-article-detail.component.html',
  styleUrls: ['./kii-article-detail.component.scss']
})
export class KiiArticleDetailComponent extends KiiBaseAbstract implements OnInit {

  /**Id of the article that we want to display */
  id:number;

  article : Article = new Article(null);
  currentLang : string = null;
  showCreated : boolean = false;

  constructor(private route: ActivatedRoute, 
              private kiiApiArticle: KiiApiArticleService,
              private kiiApiLang: KiiApiLanguageService,
              private kiiMisc:KiiMiscService,
              private localize: LocalizeRouterService,
              private router : Router) { super()}

  ngOnInit() {
    this.addSubscriber(
      this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
      })
    )
    this.addSubscriber(
      this.kiiApiArticle.onChange().subscribe(res => {
          let article = this.kiiApiArticle.getByIdOrKey(this.id);
          if (!article) {
              this.navigateNotFound();
          } else if (article.cathegory == "content") { //Do not allow to show content articles
              this.navigateNotFound();
          } else {
            this.article = article;
            this.showCreated = article.cathegory == "blog"; //Only show created on blog articles
            //Add seo stuff
            this.kiiMisc.seo(
              this.article.title,
              this.article.description,
              this.article.image,
              this.router.url
            );
          }
      })
    )
    //Subscribe to lang changes so that we can update the created date text
    this.addSubscriber(this.kiiApiLang.onChange().subscribe(res => {
          this.currentLang = res;
    }))

  }

  navigateNotFound() {
    let translatedPath: any = this.localize.translateRoute('/404');
    this.router.navigate([translatedPath]);
  }
}
