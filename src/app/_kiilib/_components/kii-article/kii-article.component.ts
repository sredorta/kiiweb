import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiArticleService } from '../../_services/kii-api-article.service';
import { Article } from '../../_models/article';
import { KiiBaseAuthAbstract } from '../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';

@Component({
  selector: 'kii-article',
  templateUrl: './kii-article.component.html',
  styleUrls: ['./kii-article.component.scss']
})
export class KiiArticleComponent extends KiiBaseAuthAbstract implements OnInit {

  /**Key or id of the concerned article */
  @Input() key : string = "";

  @Input() isFlex : boolean = false;
  @Input() vAlign : "start" | "center" | "end" = "start";

  /**Current article */
  article : Article = new Article(null);

  /**When user has edit capabilities */
  canEdit : boolean = false;

  /**Div where the editable content is placed */
  @ViewChild('container',{static:false}) div:ElementRef;

  constructor(private kiiApiArticle : KiiApiArticleService,
            private kiiApiAuth : KiiApiAuthService,
            @Inject(PLATFORM_ID) private platformId: any) { super(kiiApiAuth,platformId) }

  ngOnInit() {

    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
        this.setCanEdit();
      })
    )
  }

  ngAfterViewInit() {
    this.addSubscriber(
      this.kiiApiArticle.onChange().subscribe(res => {
        console.log(res);
        this.article = this.kiiApiArticle.getByIdOrKey(this.key);
        this.div.nativeElement.innerHTML= this.article.content;
      })
    )
  }



  /**Determines if user can edit or not */
  setCanEdit() {
    if (this.article.cathegory == "content") {
      //this.storage = "content";
      this.canEdit = this.loggedInUser.hasRole("kubiiks");
    } else if ( this.article.cathegory!= "blog") {
      //this.storage = "content";
      this.canEdit = this.loggedInUser.hasRole("admin") || this.loggedInUser.hasRole("content");
    } else {
      //this.storage = "blog";
      this.canEdit = this.loggedInUser.hasRole("admin") || this.loggedInUser.hasRole("blog");
    }  
  }


}
