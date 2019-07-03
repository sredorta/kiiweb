import { Component, OnInit } from '@angular/core';
import { KiiBlogAbstract } from '../../../_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../../_services/kii-api-article.service';

@Component({
  selector: 'kii-blog',
  templateUrl: './kii-blog.component.html',
  styleUrls: ['./kii-blog.component.scss']
})
export class KiiBlogComponent extends KiiBlogAbstract implements OnInit {

  constructor(private kiiApiArticle: KiiApiArticleService) { super(kiiApiArticle); }

  ngOnInit() {
    this.cathegory = "blog";
    this.initialize();
  }

}
