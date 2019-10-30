import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { KiiTableAbstract } from '../../../_abstracts/kii-table.abstract';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { Email } from '../../../_models/email';
import { KiiApiEmailService } from '../../../_services/kii-api-email.service';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { User } from '../../../_models/user';
import { KiiConfirmDialogComponent } from '../../kii-confirm-dialog/kii-confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'kii-admin-emails',
  templateUrl: './kii-admin-emails.component.html',
  styleUrls: ['./kii-admin-emails.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
})
export class KiiAdminEmailsComponent extends KiiTableAbstract implements OnInit {

  /**Contains all current emails */
  emails : Email[] = [];

  /**When emails are loading we show spinner with this variable */
  isDataLoading : boolean = true;

  /**Contains current language */
  currentLang : string = this.kiiApiLang.get();

  /**Shows or hides the preview or the edit pannel */
  isEditing : boolean = false;

  /**Contains current loggedin user */
  loggedInUser : User = new User(null);  

  constructor(private kiiApiLang: KiiApiLanguageService,
              private kiiApiEmail: KiiApiEmailService,
              private kiiApiAuth: KiiApiAuthService,
              private dialog: MatDialog) { super() }

  ngOnInit() {
    //On loggedInUser changes we update the user
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    );     
    //Update nice time format language when we change language
    this.addSubscriber(
        this.kiiApiLang.onChange().subscribe(res => {
          this.currentLang = res;
        })
    )  
    this.displayedColumns = ['id', 'name', 'description','createdAt', 'updatedAt', 'isProtected'];

    this.loadEmails();

    //Subscribe to email changes and refresh table
    this.addSubscriber(
      this.kiiApiEmail.onChange().subscribe(emails => {
          //Filter out cathegories of templates that are for kubiiks users only
          if (!this.loggedInUser.hasRole('kubiiks')) {
              this.emails = emails.filter(obj => obj.isProtected != true);
          }
          this.initTable(this.emails);
          this.tableSettings();
          this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    );
  }

  /**Loads all email templates */
  loadEmails() {
    this.isDataLoading = true;
    this.emails = [];
    this.addSubscriber(
      this.kiiApiEmail.load().subscribe(emails => {
        this.emails = emails;    
        this.kiiApiEmail.set(this.emails);    
      })
    )
  }

  /**Defines all filtering and sorting table settings */
  tableSettings() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.description.toLowerCase().includes(filter) || data.name.toLowerCase().includes(filter);
    };
    //Define the sorting if special
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
         case 'id': return item.id;
         case 'description': return item.description;
         default: return item[property];
      }
    };
  }


  /**Track by id */
  trackById(index:number,item:any) {
    return item.id;
  }

  /**When we are editing email */
  onEditEmail() {
    this.isEditing = !this.isEditing;
  }

  /**When new email is created */
  onCreate(value:any) {
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiEmail.create(value).subscribe(email => {
        this.kiiApiEmail.addUnshift(email);
        this.isDataLoading =false;
      },()=> this.isDataLoading = false)
    )
  }

  /**When we delete a reference */
  onDelete(email:Email) {
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      panelClass: "admin-theme",
      data: {title: "kiilib.confirm.title", text: "kiilib.confirm.text"}
    });
    this.addSubscriber(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isDataLoading = true;
          let subscription = this.kiiApiEmail.delete(email).subscribe(res => {
              this.kiiApiEmail.splice(email);
              this.isDataLoading =false;
          }, () => {
            subscription.unsubscribe();
            this.isDataLoading = false;
          }); 
        }
      })
    )
  }

  /**Saves the email modifications */
  onSave(email:Email,value:any) {
    let myNewEmail = JSON.parse(JSON.stringify(email));
    Object.keys(value).forEach((key) => {
      myNewEmail[key] = value[key];
    })
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiEmail.update(myNewEmail).subscribe(res => {
        this.kiiApiEmail.refresh(res);
        this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    )
  }



}
