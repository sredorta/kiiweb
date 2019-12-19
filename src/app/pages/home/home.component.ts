import { Component, OnInit } from '@angular/core';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
import { KiiApiSettingService } from '../../_kiilib/_services/kii-api-setting.service';
import { KiiBaseAbstract } from '../../_kiilib/_abstracts/kii-base.abstract';
import { Router } from '@angular/router';
import { KiiBlogAbstract } from '../../_kiilib/_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../_kiilib/_services/kii-api-article.service';
import { KiiApiPageService } from '../../_kiilib/_services/kii-api-page.service';
import { homedir } from 'os';
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

  /**Contains all realisation-comments articles */
  articlesComments : Article[] = [];

  showAnimationComments : boolean = false;

  /**Contains animations of the features */
  animations :any  = {};

  constructor(private kiiApiArticle: KiiApiArticleService, 
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService, 
    private device : DeviceDetectorService,
    private router: Router) { super(kiiApiArticle, kiiApiPage, kiiMisc,router); }

    ngOnInit() {
      this.page="realisations";
      this.initialize();
    }
  
    initialize() {
      //Load all articles and if language is switched we reload them
      this.isLoading = true;
      this.addSubscriber(
        this.kiiApiArticle.onChange().subscribe(res => {
          this.articlesFeatures = res.filter(obj => obj.cathegory == "home-features" && obj.public == true);
          this.articlesComments = res.filter(obj => obj.cathegory == "realisations-comments" && obj.public == true);
          this.isLoading = false;
        }, () => this.isLoading = false)
      )  
      this.addSubscriber(
        this.kiiApiPage.onChange().subscribe(res => {
          let myPage = this.kiiApiPage.getByKey(this.page);
          this.kiiMisc.seo(myPage.title,myPage.description,myPage.image, this.router.url);
          //this.articles = res.filter(obj => obj.cathegory == this.cathegory && obj.public == true);
          this.isLoading = false;
        }, () => this.isLoading = false)
      )  
    }
  
    animate(i:number) {
      console.log("Animating item:",i);
      if (!this.animations[i]) {
        this.animations[i] = true;
      }
      console.log(this.animations);
 //     if (!this.device.isMobile())
 //       this.showAnimation = true;
    }

    isAnimated(i:number) {
      if (this.animations[i]) return true;
      return false;
    }

    animateComments(event : boolean) {
      if (!this.device.isMobile())
        this.showAnimationComments = true;
    }


    /**Determines if element is odd or even */
    oddOrEven(index:number) {
      if (index % 2 == 1) {
        return 'even';
      }
      return 'odd';
    }
}

