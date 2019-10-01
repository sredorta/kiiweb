import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild, ElementRef, SimpleChanges, Renderer2 } from '@angular/core';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiArticleService } from '../../_services/kii-api-article.service';
import { Article } from '../../_models/article';
import { KiiBaseAuthAbstract } from '../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';
import { AngularEditorComponent } from '../../_components/angular-editor/angular-editor.component';
import { DiskType } from '../../_services/kii-api-disk.service';
//import { AngularEditorConfig, AngularEditorComponent } from '../../_components/angular-editor/angular-editor.component';


@Component({
  selector: 'kii-article',
  templateUrl: './kii-article.component.html',
  styleUrls: ['./kii-article.component.scss']
})
export class KiiArticleComponent extends KiiBaseAuthAbstract implements OnInit {

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
            @Inject(PLATFORM_ID) private platformId: any
            ) { super(kiiApiAuth,platformId) }

  ngOnInit() {
    console.log("WE ARE UNSING", this.disk);
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
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
            this.setCanEdit();

        })
      )
    });
  }



  /**Determines if user can edit or not */
  setCanEdit() {
    if (this.article.exists()) {
      switch (this.article.cathegory) {
        case(DiskType.BLOG): {
          this.disk = DiskType.BLOG;
          this.canEdit = this.loggedInUser.hasRole("admin") || this.loggedInUser.hasRole("blog");
          break;
        }
        case(DiskType.EMAIL): {
          this.disk = DiskType.EMAIL;
          this.canEdit = this.loggedInUser.hasRole("admin") || this.loggedInUser.hasRole("email");
          break;
        }
        default:
          this.disk = DiskType.CONTENT;
          this.canEdit = this.loggedInUser.hasRole("kubiiks");
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
