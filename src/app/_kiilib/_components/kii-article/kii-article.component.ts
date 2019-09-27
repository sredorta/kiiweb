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

  /**When user has edit capabilities */
  canEdit : boolean = false;

  /**Storage folder */
  storage : "content" | "blog" | "email" = "content";

  /**Contains current background image */
  backgroundImage : string = "none";  

  /**When we are saving */
  isLoading : boolean = false;


  /**Initial editor Config */
  editorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '200px',
    placeholder: 'Text ...',
    translate: 'no',
    uploadUrl: '/upload/editor/content'};

  /**Div where the editable content is placed */
  @ViewChild('container',{static:false}) div:ElementRef;

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
            if (this.article) {
              this.div.nativeElement.innerHTML= this.article.content;
              this.backgroundImage = this.article.backgroundImage;
            }
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
    if (this.isEditing == true) {
      setTimeout( () => {
          this.editor.textArea.nativeElement.innerHTML = this.article.content;
          this.editor.registerOnChange( () => {
            this.div.nativeElement.innerHTML = this.editor.textArea.nativeElement.innerHTML;
            if (this.editor.textArea.nativeElement.innerHTML!== this.article.content) this.isInitial = false;
            else this.isInitial = true;
          });  
          this.setBackground();
      })
    }
  }

  /**When we cancel */
  onCancel() {
    this.div.nativeElement.innerHTML = this.article.content;
    this.editor.textArea.nativeElement.innerHTML = this.article.content;
    this.isInitial = true;
    this.article.backgroundImage = this.backgroundImage;
    this.setBackground();
  }

  /**When user clicks on remove current background image */
  onUploadBackgroundImage(image:string) {
    console.log(image);
    this.article.backgroundImage = image;
    this.setBackground();
  }
  /**Sets editor background image to the editor */
  setBackground() {
    this.renderer.removeStyle(this.editor.textArea.nativeElement, 'backgroundImage');
      if (this.article.backgroundImage.match("http")) {
          this.renderer.setStyle(this.editor.textArea.nativeElement, 'backgroundImage', 'url(' + this.article.backgroundImage + ')',1);
      }
  }


  /**When background is clicked to upload an image */
  onFileChanged(event : any) {
    let file = event.target.files[0];
    this.onUpload(file);
  }

  /**Upload image for background image of editor*/
  onUpload(file:File) {
      // this.http is the injected HttpClient
      const uploadData = new FormData();
      uploadData.append('file', file, file.name);
      let subscription =  this.kiiApiArticle.uploadImage(this.editor.config.uploadUrl,uploadData).subscribe( res => {
          this.article.backgroundImage = res.imageUrl;
          this.setBackground();
        }, () => subscription.unsubscribe());
  }

  /**When we save the changes */
  onSave() {
    this.isLoading = true;
    this.article.content = this.editor.textArea.nativeElement.innerHTML;
    this.addSubscriber(
      this.kiiApiArticle.update(this.article).subscribe(res => {
        //this.kiiApiArticle.refresh(this.article);
        this.isLoading = false;
      }, ()=> this.isLoading = false)
    )

  }

}
