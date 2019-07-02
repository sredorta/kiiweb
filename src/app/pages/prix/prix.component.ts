import { Component, OnInit } from '@angular/core';
import { KiiBlogAbstract } from '../../_kiilib/_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../_kiilib/_services/kii-api-article.service';

@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.scss']
})
export class PrixComponent extends KiiBlogAbstract implements OnInit {

  constructor(private kiiApiArticle: KiiApiArticleService) { super(kiiApiArticle); }

  ngOnInit() {
    this.cathegory = "prix";
    this.initialize();
  }
}
