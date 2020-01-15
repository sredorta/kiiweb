import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { KiiApiArticleService } from '../../_services/kii-api-article.service';
import { Article } from '../../_models/article';
import { KiiBaseAuthAbstract } from '../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';
import { AngularEditorComponent } from '../../_libraries/angular-editor/angular-editor.component';
import { DiskType } from '../../_services/kii-api-disk.service';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'kii-article',
  templateUrl: './kii-article.component.html',
  styleUrls: ['./kii-article.component.scss']
})
export class KiiArticleComponent  implements OnInit {
  isBrowser:boolean = false;

  /**shows created bottom line info */
  @Input() showCreated :boolean = false;
  /**Key or id of the concerned article */
  @Input() key : string = "";
  constructor(@Inject(PLATFORM_ID) private platformId: any) { 
     if (isPlatformBrowser(this.platformId)) this.isBrowser = false;
   }

  ngOnInit() {

  }


}
