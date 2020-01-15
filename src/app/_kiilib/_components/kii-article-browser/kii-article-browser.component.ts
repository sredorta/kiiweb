import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { KiiApiArticleService } from '../../_services/kii-api-article.service';
import { Article } from '../../_models/article';
import { KiiBaseAuthAbstract } from '../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';
import { AngularEditorComponent } from '../../_libraries/angular-editor/angular-editor.component';
import { DiskType } from '../../_services/kii-api-disk.service';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';


@Component({
  selector: 'kii-article-browser',
  templateUrl: './kii-article-browser.component.html',
  styleUrls: ['./kii-article-browser.component.scss']
})
export class KiiArticleBrowserComponent extends KiiBaseAuthAbstract implements OnInit {

  /**Key or id of the concerned article */
  @Input() key : string = "";

  /**Storage folder */
  disk : DiskType = DiskType.CONTENT;

  /**Editing mode */
  isEditing : boolean = false;

  /**Variable to show if we have initial value or not */
  isInitial: boolean = true;

  /**Current article */
  article : Article = new Article(null);

  /**Saved article not mutted */
  savedArticle : Article = new Article(null);

  /**Toggling cancel for change detection on angular editor */
  cancel : boolean = true;

  /**When user has edit capabilities */
  canEdit : boolean = false;

  /**Current language in use for created at */
  currentLang : string;

  /**shows created bottom line info */
  @Input() showCreated :boolean = false;

  /**Contains current background image */
  backgroundImage : string = null;  

  /**When we are saving */
  isLoading : boolean = false;

  /**Initial html code */
  htmlInitial : string = "";

  /**Initial editor Config */
  editorConfig = {
    editable: false,
    spellcheck: true,
    minHeight: '50px',
    placeholder: 'Text ...',
    translate: 'no',
    sanitize: true,
    uploadUrl: '/upload/editor/content'};


  /**Contains the editor component */
  @ViewChild(AngularEditorComponent,{static:false}) editor : AngularEditorComponent;

  constructor(private kiiApiArticle : KiiApiArticleService,
            private kiiApiAuth : KiiApiAuthService,
            private kiiApiLang: KiiApiLanguageService,
            @Inject(PLATFORM_ID) private platformId: any
            ) { super(kiiApiAuth,platformId) }

  ngOnInit() {
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
    //Subscribe to lang changes so that we can update the created date text
    this.addSubscriber(this.kiiApiLang.onChange().subscribe(res => {
          this.currentLang = res;
    }))
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.addSubscriber(
        this.kiiApiArticle.onChange().subscribe(res => {
            this.article = this.kiiApiArticle.getByIdOrKey(this.key);
            this.backgroundImage = this.article.backgroundImage;
            this.htmlInitial = this.article.content;
            this.savedArticle = JSON.parse(JSON.stringify(this.article));
            this.setCanEdit();

        })
      )
    });
  }



  /**Determines if user can edit or not */
  setCanEdit() {
    if (this.article.exists()) {
      switch (this.article.cathegory) {
        case("blog"): {
          this.disk = DiskType.BLOG;
          this.canEdit = this.loggedInUser.hasRole("admin") || this.loggedInUser.hasRole("blog");
          break;
        }
        case("content"): {
          this.disk = DiskType.CONTENT;
          this.canEdit = this.loggedInUser.hasRole("kubiiks");
          break;
        }
        default: {
          this.disk = DiskType.CONTENT;
          this.canEdit = this.loggedInUser.hasRole("admin") || this.loggedInUser.hasRole("content");
        }
      }
    }
  }

  /**When we enter in edit mode */
  edit() {
    this.isEditing = !this.isEditing;
  }

  /**When we cancel */
  onCancel() {
      this.htmlInitial = this.savedArticle.content;
      this.backgroundImage = this.savedArticle.backgroundImage;
      this.article.content = this.savedArticle.content;
      this.article.backgroundImage = this.savedArticle.backgroundImage;
      this.isEditing = false;
      this.cancel = !this.cancel;
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
    this.article.backgroundImage = image;
  }

}
