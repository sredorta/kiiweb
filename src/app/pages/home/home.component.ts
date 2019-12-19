import { Component, OnInit } from '@angular/core';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
import { KiiApiSettingService } from '../../_kiilib/_services/kii-api-setting.service';
import { KiiBaseAbstract } from '../../_kiilib/_abstracts/kii-base.abstract';
import { Router } from '@angular/router';
import { KiiBlogAbstract } from '../../_kiilib/_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../_kiilib/_services/kii-api-article.service';
import { KiiApiPageService } from '../../_kiilib/_services/kii-api-page.service';
import { homedir } from 'os';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent extends KiiBlogAbstract implements OnInit {
  constructor(private kiiApiArticle: KiiApiArticleService, 
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService, 
    private router: Router) { super(kiiApiArticle, kiiApiPage, kiiMisc,router); }

  ngOnInit() {
    this.cathegory = "content";
    this.page="home";
    this.initialize();
  }

  animateTop() {
    
  }

}

