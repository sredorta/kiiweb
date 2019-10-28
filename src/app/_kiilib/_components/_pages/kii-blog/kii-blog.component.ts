import { Component, OnInit } from '@angular/core';
import { KiiBlogAbstract } from '../../../_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../../_services/kii-api-article.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { KiiAinimations } from '../../../_utils/kii-animations';
import { LocalizeRouterService } from '../../../_libraries/localize-router';

@Component({
  selector: 'kii-blog',
  templateUrl: './kii-blog.component.html',
  styleUrls: ['./kii-blog.component.scss'],
  animations: KiiAinimations.blog()
})
export class KiiBlogComponent extends KiiBlogAbstract implements OnInit {

  constructor(private kiiApiArticle: KiiApiArticleService, private localize: LocalizeRouterService) { super(kiiApiArticle); }

  ngOnInit() {
    this.cathegory = "blog";
    this.initialize();
  }

  /**Gets route of article */
  getRoute(articleId:number) {
    return this.localize.translateRoute('/article/'+ articleId);
  }

}
