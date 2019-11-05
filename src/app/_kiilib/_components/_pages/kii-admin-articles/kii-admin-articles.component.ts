import { Component, OnInit, ViewChild } from '@angular/core';
import { KiiTableAbstract } from '../../../_abstracts/kii-table.abstract';
import { Article } from '../../../_models/article';
import { User } from '../../../_models/user';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { KiiApiSettingService } from '../../../_services/kii-api-setting.service';
import { KiiApiArticleService } from '../../../_services/kii-api-article.service';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { KiiConfirmDialogComponent } from '../../kii-confirm-dialog/kii-confirm-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatDialog, MatSelectChange, MatSlideToggleChange, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'kii-admin-articles',
  templateUrl: './kii-admin-articles.component.html',
  styleUrls: ['./kii-admin-articles.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],    
})
export class KiiAdminArticlesComponent extends KiiTableAbstract implements OnInit {
  /**Contains all current articles */
  articles : Article[] = [];

  /**When articles are loading we show spinner with this variable */
  isDataLoading : boolean = false;

  /**Contains available cathegories */
  cathegories : string[] = [];

  /**Cathegory for new articles */
  newCathegory : string = null;

  /**Contains current loggedin user */
  loggedInUser : User = new User(null);  

  /**Contains current language for nice date format */
  currentLang : string;

  /**Make sure that pagination works in this case */
  @ViewChild(MatSort, {static:false}) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
     }
    
  @ViewChild(MatPaginator,{static:false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }  
  setDataSourceAttributes() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  constructor(private kiiApiAuth: KiiApiAuthService,
              private kiiApiSetting: KiiApiSettingService,
              private kiiApiArticle: KiiApiArticleService,
              private kiiApiLang: KiiApiLanguageService,
              private dialog: MatDialog) { super() }

  ngOnInit() {
    //On loggedInUser changes we update the user
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    );      
    this.addSubscriber(
      this.kiiApiSetting.onChange().subscribe(res => {
        if (res.length>0)
          this.cathegories = this.kiiApiSetting.getByKey("article_cathegories").value.split(","); 
      })
    ) 
    //Load all articles
    this.addSubscriber(
      this.kiiApiArticle.onChange().subscribe(res => {
        res = res.filter(obj => obj.cathegory != 'dialog'); //Do not show dialog cathegory
        //Filter depending on roles
        if (!this.loggedInUser.hasRole('kubiiks')) {
          res = res.filter(obj => obj.cathegory != 'content');
          if (!this.loggedInUser.hasRole('blog') || !this.loggedInUser.hasRole('content')) {
            if (this.loggedInUser.hasRole('blog')) {
                res = res.filter(obj => obj.cathegory == 'blog');
              }
            if (this.loggedInUser.hasRole('content')) {
                res = res.filter(obj => obj.cathegory != 'blog');
            }
          }
        }
        //Order result by cathegories first
        res = res.sort((a,b) => {
          return (a.cathegory>b.cathegory?1:0)
        });
        if (res.length>0) {
          this.displayedColumns= ['id', 'image','cathegory','title','createdAt','updatedAt','public'];
          this.articles = res;
          this.filterCathegories();
          this.initTable(this.articles);
          this.tableSettings();
        }
      })
    )
    //Update nice time format language when we change language
    this.addSubscriber(
      this.kiiApiLang.onChange().subscribe(res => {
        this.currentLang = res;
      })
    )
  }

  /**Defines all filtering and sorting table settings */
  tableSettings() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.title.toLowerCase().includes(filter) || data.cathegory.toLowerCase().includes(filter) || data.description.includes(filter);
    };
    //Define the sorting if special
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
         case 'id': return item.id;
         case 'title': return item.title;
         case 'description': return item.description;
         default: return item[property];
      }
    };
  }

  /**Filter cathegories by removing the content cathegory so that we cannot create content */
  filterCathegories() {
      let index = this.cathegories.findIndex(item => item.includes("content"));
      if (index>=0) this.cathegories.splice(index,1);
  }

  /**Track by id */
  trackById(index:number,item:any) {
    return item.id;
  }

  /**When we delete article */
  onArticleDelete(article:Article) {
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      panelClass: "admin-theme",
      data: {title: "kiilib.confirm.title", text: "kiilib.confirm.text"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isDataLoading = true;
        let subscription = this.kiiApiArticle.delete(article).subscribe(res => {
            this.kiiApiArticle.splice(article);
            this.isDataLoading =false;
        }, () => {
          subscription.unsubscribe();
          this.isDataLoading = false;
        }); 
      }
    });
  }

  /**When we add an article and select cathegory */
  onNewCathegoryChange(event:MatSelectChange) {
      this.newCathegory = event.value;
  }

  /**When we create a new article */
  onArticleCreate() {
    this.isDataLoading = true;
    let subscription = this.kiiApiArticle.create(this.newCathegory).subscribe(article => {
        console.log(article);
        this.kiiApiArticle.addUnshift(article);
        this.isDataLoading =false;
    }, () => {
      subscription.unsubscribe();
      this.isDataLoading = false;
    });     

  }


  /**Changes article public status */
  onPublicChange(article:Article,status:MatSlideToggleChange) {
    article.public = status.checked;
    this.isDataLoading = true;
    let subscription = this.kiiApiArticle.update(article).subscribe(article => {
      this.isDataLoading =false;
    }, error => {
      article.public = !article.public;
      this.isDataLoading = false;
      subscription.unsubscribe();
    });  
  }

}
