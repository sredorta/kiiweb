import { Component, OnInit } from '@angular/core';
import { KiiBlogAbstract } from '../../_kiilib/_abstracts/kii-blog.abstract';
import { KiiApiArticleService } from '../../_kiilib/_services/kii-api-article.service';
import { KiiAinimations } from '../../_kiilib/_utils/kii-animations';
import { Article } from '../../_kiilib/_models/article';
import { KiiApiPageService } from '../../_kiilib/_services/kii-api-page.service';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realisations',
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss'],
  animations: KiiAinimations.realisations()

})
export class RealisationsComponent extends KiiBlogAbstract implements OnInit {
  showAnimationClients : boolean = false;
  showAnimationComments : boolean = false;

  articlesClients : Article[] = [];
  articlesComments : Article[] = [];
  
  constructor(private kiiApiArticle: KiiApiArticleService, 
    private kiiApiPage: KiiApiPageService, 
    private kiiMisc : KiiMiscService, 
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
        //this.articles = res.filter(obj => obj.cathegory == this.cathegory && obj.public == true);
        this.articlesClients = res.filter(obj => obj.cathegory == "realisations" && obj.public == true);
        this.articlesComments = res.filter(obj => obj.cathegory == "realisations-comments" && obj.public == true);
        console.log("Clients", this.articlesClients);
        console.log("Comments", this.articlesComments);
        this.isLoading = false;
      }, () => this.isLoading = false)
    )  
    this.addSubscriber(
      this.kiiApiPage.onChange().subscribe(res => {
        console.log("MyPage is:",this.kiiApiPage.getByKey(this.page));
        let myPage = this.kiiApiPage.getByKey(this.page);
        this.kiiMisc.seo(myPage.title,myPage.description,myPage.image, this.router.url);
        //this.articles = res.filter(obj => obj.cathegory == this.cathegory && obj.public == true);
        this.isLoading = false;
      }, () => this.isLoading = false)
    )  
  }


  animateClients(event : boolean) {
    console.log("Recieved onAppear",event);
    this.showAnimationClients = true;
  }
  animateComments(event : boolean) {
    console.log("Recieved onAppear",event);
    this.showAnimationComments = true;
  }
}