import { Component, OnInit, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';
import { ActivatedRoute, Router } from '@angular/router';
import { KiiApiArticleService } from '../../../_services/kii-api-article.service';
import { Article } from '../../../_models/article';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { KiiApiSettingService } from '../../../_services/kii-api-setting.service';

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

  constructor(private route: ActivatedRoute, 
              private kiiApiArticle: KiiApiArticleService,
              private kiiApiLang: KiiApiLanguageService,
              private kiiApiSetting: KiiApiSettingService,
              @Inject(PLATFORM_ID) private platformId: any,              
              private title : Title,
              private meta: Meta,
              private router : Router) { super()}

  ngOnInit() {
    this.addSubscriber(
      this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
      })
    )
    this.addSubscriber(
      this.kiiApiArticle.onChange().subscribe(res => {
          this.article = this.kiiApiArticle.getByIdOrKey(this.id);
          //Add seo stuff
          this.seo();
      })
    )
    //Subscribe to lang changes so that we can update the created date text
    this.addSubscriber(this.kiiApiLang.onChange().subscribe(res => {
          this.currentLang = res;
    }))

  }

  /**Apply all seo related stuff */
  seo() {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = this.kiiApiLang.get()
    }
    this.title.setTitle( this.kiiApiSetting.getByKey('sitename').value + " : "+ this.article.title);
    this.meta.updateTag({ name: 'description', content: this.article.description });
    this.meta.updateTag({name:"robots", content:"index, follow"});
    this.meta.updateTag({ property: 'og:title', content: this.kiiApiSetting.getByKey('sitename').value + " : " + this.article.title });
    this.meta.updateTag({ property: 'og:description', content: this.article.description });
    this.meta.updateTag({ property: 'og:url', content: this.router.url });
    this.meta.updateTag({ property: 'og:image', content: this.article.image });
    this.meta.updateTag({ property: 'og:site_name', content: this.kiiApiSetting.getByKey('sitename').value });
    console.log("TITLE", this.article.title);
    console.log("DESCRIPTION", this.article.description);
    console.log("URL", this.kiiApiSetting.getByKey('url').value + this.router.url);
    console.log("IMAGE", this.article.image);
    console.log("SITE", this.kiiApiSetting.getByKey('sitename').value);
  }
}
