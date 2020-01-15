import { Component, OnInit, Input, PLATFORM_ID, Inject, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { KiiApiArticleService } from '../../_services/kii-api-article.service';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';
import { Article } from '../../_models/article';
import { DiskType } from '../../_services/kii-api-disk.service';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';

@Component({
  selector: 'kii-article-ssr',
  templateUrl: './kii-article-ssr.component.html',
  styleUrls: ['./kii-article-ssr.component.scss']
})
export class KiiArticleSsrComponent extends KiiBaseAbstract implements OnInit {
 /**Key or id of the concerned article */
 @Input() key : string = "";


 /**Current article */
 article : Article = new Article(null);


 /**shows created bottom line info */
 @Input() showCreated :boolean = false;

 /**Contains current background image */
 backgroundImage : string = null;  


 /**Initial html code */
 htmlInitial : string = "";

 @ViewChild('myEditor', {static: false}) textArea: ElementRef;

  constructor(private kiiApiArticle : KiiApiArticleService,
    private kiiApiLang: KiiApiLanguageService,
    private r: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any) { super() }

  ngOnInit() {

  }
  ngAfterViewInit() {
    setTimeout(()=> {
      this.addSubscriber(
        this.kiiApiArticle.onChange().subscribe(res => {
            this.article = this.kiiApiArticle.getByIdOrKey(this.key);
            this.backgroundImage = this.article.backgroundImage;
            this.htmlInitial = this.article.content;
            if (this.backgroundImage!= null) {
              this.r.setStyle(this.textArea.nativeElement, 'backgroundImage', 'url(' + this.backgroundImage + ')',1);
            }
            //Fill with input html
            this.textArea.nativeElement.innerHTML = this.htmlInitial;
        })
      )
    });
  }
}

