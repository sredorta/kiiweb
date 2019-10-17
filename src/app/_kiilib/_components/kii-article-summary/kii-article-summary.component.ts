import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Article } from '../../_models/article';
import { KiiBaseAuthAbstract } from '../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';
import { KiiApiArticleService } from '../../_services/kii-api-article.service';
import { KiiArticleSummaryFormComponent } from '../_forms/kii-article-summary-form/kii-article-summary-form.component';

@Component({
  selector: 'kii-article-summary',
  templateUrl: './kii-article-summary.component.html',
  styleUrls: ['./kii-article-summary.component.scss']
})
export class KiiArticleSummaryComponent extends KiiBaseAuthAbstract implements OnInit {

  /**Key or id of the concerned article */
  @Input() key : string = null;

  /**Allows summary to have a routerLink to the detail or not */
  @Input() hasRouterLink : boolean = true;

  /**Current article that we are editing */
  article : Article = new Article(null);

  /**Contains auth user has content/blog editing rights */
  canEdit : boolean = false;

  /**Show or hide the edition part */
  isEditing : boolean = false;

  /**Storage to be used for images : content (default), blog */
  storage : "content" | "blog" | "email" = "content";

  @ViewChild(KiiArticleSummaryFormComponent, {static:false}) form : KiiArticleSummaryFormComponent;

  constructor(private kiiApiAuth : KiiApiAuthService,
              private kiiApiArticle: KiiApiArticleService,
              @Inject(PLATFORM_ID) private platformId: any) { super(kiiApiAuth,platformId) }

  ngOnInit() {
    this.addSubscriber(
      this.kiiApiArticle.onChange().subscribe( res => {
        this.article = this.kiiApiArticle.getByIdOrKey(this.key);
      })
    )
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
        this.setCanEdit();
      })
    )    
  }
  /**Determines if user can edit or not */
  setCanEdit() {
    if (this.article.cathegory == "content") {
      this.storage = "content";
      this.canEdit = this.loggedInUser.hasRole("kubiiks");
    } else if ( this.article.cathegory!= "blog") {
      this.storage = "content";
      this.canEdit = this.loggedInUser.hasRole("admin") || this.loggedInUser.hasRole("content");
    } else {
      this.storage = "blog";
      this.canEdit = this.loggedInUser.hasRole("admin") || this.loggedInUser.hasRole("blog");
    }  
  }

  edit() {
    this.isEditing = !this.isEditing;
  }

  save(value:any) {
    this.form.isFormLoading = true;
    this.article.title = value.title;
    this.article.description = value.description;
    this.article.image = value.image;
    //TODO: Add image here !
    this.addSubscriber(
      this.kiiApiArticle.update(this.article).subscribe(res => {
        this.form.isFormLoading = false;
        //Close expansion
        this.isEditing = false;
      }, ()=> this.form.isFormLoading = false)
    )
  }

  /**When form is modified we actualize the gui */
  update(value:any) {
    this.article.title = value.title;
    this.article.description = value.description;
    this.article.image = value.image;
  }

}
