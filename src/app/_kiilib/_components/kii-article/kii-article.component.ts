import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild, ElementRef, SimpleChanges, Renderer2 } from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiArticleService } from '../../_services/kii-api-article.service';
import { Article } from '../../_models/article';
import { KiiBaseAuthAbstract } from '../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';
import { AngularEditorComponent } from '../../_components/angular-editor/angular-editor.component';
//import { AngularEditorConfig, AngularEditorComponent } from '../../_components/angular-editor/angular-editor.component';


@Component({
  selector: 'kii-article',
  templateUrl: './kii-article.component.html',
  styleUrls: ['./kii-article.component.scss']
})
export class KiiArticleComponent extends KiiBaseAuthAbstract implements OnInit {

  /**Key or id of the concerned article */
  @Input() key : string = "";

  /**Display article in flex mode */
  @Input() isFlex : boolean = false;

  /**Center content vertically */
  @Input() vAlign : "start" | "center" | "end" = "start";

  /**Editing mode */
  isEditing : boolean = false;

  /**Variable to show if we have initial value or not */
  isInitial: boolean = true;

  /**Current article */
  article : Article = new Article(null);

  /**Saved article not mutted */
  savedArticle : Article = new Article(null);


  /**When user has edit capabilities */
  canEdit : boolean = false;

  /**Storage folder */
  storage : "content" | "blog" | "email" = "content";

  /**Contains current background image */
  backgroundImage : string = null;  

  /**When we are saving */
  isLoading : boolean = false;

  /**Initial html code */
  htmlInitial : string = "";

  /**Initial editor Config */
  editorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '50px',
    placeholder: 'Text ...',
    translate: 'no',
    salitize: true,
    uploadUrl: '/upload/editor/content'};


  /**Contains the editor component */
  @ViewChild(AngularEditorComponent,{static:false}) editor : AngularEditorComponent;

  constructor(private kiiApiArticle : KiiApiArticleService,
            private kiiApiAuth : KiiApiAuthService,
            @Inject(PLATFORM_ID) private platformId: any,
            private renderer: Renderer2 ) { super(kiiApiAuth,platformId) }

  ngOnInit() {
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
        this.setCanEdit();
      })
    )
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.addSubscriber(
        this.kiiApiArticle.onChange().subscribe(res => {
            this.article = this.kiiApiArticle.getByIdOrKey(this.key);
            this.backgroundImage = this.article.backgroundImage;
            this.htmlInitial = this.article.content;
            this.savedArticle = JSON.parse(JSON.stringify(this.article));
        })
      )
    });
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
    this.editorConfig.uploadUrl = '/upload/editor/' + this.storage;
  }

  /**When we enter in edit mode */
  edit() {
    this.isEditing = !this.isEditing;
  }

  /**When we cancel */
  onCancel() {
    console.log("Setting initial html : ", this.savedArticle);
    this.htmlInitial = "";
    this.backgroundImage = "none";
    setTimeout(() => {
      console.log("Setting backgroundImage to", this.savedArticle.backgroundImage);
      this.htmlInitial = this.savedArticle.content;
      this.backgroundImage = this.savedArticle.backgroundImage;
    },200);
  }





  /**When we save the changes */
  onSave() {
    this.isLoading = true;
    this.article.content = this.editor.textArea.nativeElement.innerHTML;
    this.addSubscriber(
      this.kiiApiArticle.update(this.article).subscribe(res => {
        //this.kiiApiArticle.refresh(this.article);
        this.isLoading = false;
        this.isEditing = false;
      }, ()=> this.isLoading = false)
    )
  }

  onBackgroundChange(image:string) {
    console.log("Setting current image background to :",image);
    this.article.backgroundImage = image;
  }

}
