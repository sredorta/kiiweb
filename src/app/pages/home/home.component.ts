import { Component, OnInit } from '@angular/core';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
import { Router } from '@angular/router';
import { KiiBlogAbstract } from '../../_kiilib/_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../_kiilib/_services/kii-api-article.service';
import { KiiApiPageService } from '../../_kiilib/_services/kii-api-page.service';
import { Article } from '../../_kiilib/_models/article';
import { DeviceDetectorService } from 'ngx-device-detector';
import { KiiAinimations } from '../../_kiilib/_utils/kii-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [KiiAinimations.realisationsComments()]

})

export class HomeComponent extends KiiBlogAbstract implements OnInit {

  /**Contains all features articles */
  articlesFeatures : Article[] = [];

  /**Contains all menu articles */
  articlesMenu : Article[] = [];

  /**Contains all realisation-comments articles */
  articlesComments : Article[] = [];


  /**Contains animations of the features */
  animationsFeatures :any  = {};

  /**Contains animations of the menu */
  animationsMenu :any  = {};

  constructor(private kiiApiArticle: KiiApiArticleService, 
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService, 
    private device : DeviceDetectorService,
    private router: Router) { super(kiiApiArticle, kiiApiPage, kiiMisc,router); }

    ngOnInit() {
      this.page="home";
      this.initialize();
    }
  
    initialize() {
      //Load all articles and if language is switched we reload them
      this.isLoading = true;
      this.addSubscriber(
        this.kiiApiArticle.onChange().subscribe(res => {
          this.articlesFeatures = res.filter(obj => obj.cathegory == "home-features" && obj.public == true).sort((a,b)=> a.id-b.id);
          this.articlesMenu = res.filter(obj => obj.cathegory == "home-menu" && obj.public == true).sort((a,b)=> a.id-b.id);
          this.articlesComments = res.filter(obj => obj.cathegory == "realisations-comments" && obj.public == true);
          if (res.length>0)
            this.isLoading = false;
        })
      )  
      this.addSubscriber(
        this.kiiApiPage.onChange().subscribe(res => {
          let myPage = this.kiiApiPage.getByKey(this.page);
          this.kiiMisc.seo(myPage.title,myPage.description,myPage.image, this.router.url);
        })
      )  
    }
  
    animateFeature(i:number) {
      if (!this.animationsFeatures[i]) {
        this.animationsFeatures[i] = true;
      }
    }

    isAnimatedFeature(i:number) {
      if (this.animationsFeatures[i]) return true;
      return false;
    }

    animateMenu(i:number) {
      if (!this.animationsMenu[i]) {
        this.animationsMenu[i] = true;
      }
    }

    isAnimatedMenu(i:number) {
      if (this.animationsMenu[i]) return true;
      return false;
    }

    /**Determines if element is odd or even */
    oddOrEven(index:number) {
      if (index % 2 == 1) {
        return 'even';
      }
      return 'odd';
    }
}

