import { Component, OnInit } from '@angular/core';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
import { KiiApiSettingService } from '../../_kiilib/_services/kii-api-setting.service';
import { KiiBaseAbstract } from '../../_kiilib/_abstracts/kii-base.abstract';
import { Router } from '@angular/router';
import { KiiBlogAbstract } from '../../_kiilib/_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../_kiilib/_services/kii-api-article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends KiiBlogAbstract implements OnInit {

  constructor(private kiiApiArticle: KiiApiArticleService) { super(kiiApiArticle); }

  ngOnInit() {
    this.cathegory = "content";
    this.initialize();
  }


}

