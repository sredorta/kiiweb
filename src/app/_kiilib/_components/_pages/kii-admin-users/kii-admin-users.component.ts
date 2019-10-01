import { Component, OnInit } from '@angular/core';
import { KiiApiUserService } from '../../../_services/kii-api-user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { KiiConfirmDialogComponent } from '../../kii-confirm-dialog/kii-confirm-dialog.component';
import { KiiTableAbstract } from '../../../_abstracts/kii-table.abstract';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { IUser, User } from '../../../_models/user';
import { IRole } from '../../../_models/role';
import { MatSlideToggleChange, MatDialog, MatCheckboxChange } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Email } from '../../../_models/email';
import { KiiApiEmailService } from '../../../_services/kii-api-email.service';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';

@Component({
  selector: 'app-kii-admin-users',
  templateUrl: './kii-admin-users.component.html',
  styleUrls: ['./kii-admin-users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ], 
})
export class KiiAdminUsersComponent extends KiiTableAbstract implements OnInit {
  /**Contains all available roles after initialization */
  roles : IRole[] = [];
  
  /**Disables or Enables the sliders to modify foles */
  disableRoleSliders : boolean = true;

  /**Current language in use */
  currentLang : string;

  /**All emails templates */
  emails : Email[] = [];

  /**Checks if user is on a mobile device */
  isMobile : boolean = this.device.isMobile();
  
  /**Contains current loggedin user */
  public loggedInUser : User = new User(null);

  constructor(private kiiApiUser : KiiApiUserService,
              private kiiApiLang : KiiApiLanguageService,
              private dialog : MatDialog, 
              private device : DeviceDetectorService,
              private kiiApiEmail: KiiApiEmailService,
              private kiiApiAuth: KiiApiAuthService) { super() }

  ngOnInit() {
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
    this.displayedColumns = ['id','lastName', 'firstName', 'email','createdAt'];
    //Get all users
    this.addSubscriber(this.kiiApiUser.load().subscribe(res => {
      this.initTable(res);
      //Define the filtering
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.lastName.toLowerCase().includes(filter) || data.firstName.toLowerCase().includes(filter);
      };
      //Define the sorting if special
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
           //case 'firstName': return item.name;
           default: return item[property];
        }
      };
      this.isDataLoading = false;
    }, () => this.isDataLoading = false));

    //Get all available roles
    this.addSubscriber(this.kiiApiUser.getAllRoles().subscribe(res => {
        this.roles = res;
    }));
    //Subscribe to lang changes so that we can update the created date text
    this.addSubscriber(this.kiiApiLang.onChange().subscribe(res => {
        this.currentLang = res;
    }))
  }

  /**Loads all email templates */
  loadEmails() {
    if (this.emails.length>0) {
      this.emails = [];
    } else {
      this.isDataLoading = true;
      this.emails = [];
      this.addSubscriber(
        this.kiiApiEmail.load().subscribe(emails => {
          this.emails = emails;    
          this.kiiApiEmail.set(this.emails);    
          this.isDataLoading = false;
        })
      )
    }
  }

  /**Checks if specific user has the role */
  hasRole(user: IUser, id:number) {
    const myUser = new User(user);
    return myUser.hasRole(id);
  }


  /**When a role changes it's status */
  onRoleChange(event: MatSlideToggleChange, userId:number,roleId:number) {
    this.isDataLoading = true;
    if (event.checked == true)
      this.addSubscriber(
        this.kiiApiUser.attachRole(userId,roleId).subscribe(res => {
          this.isDataLoading = false;
        }, error => {
          event.source.toggle(); //Undo in case of error
        }, () => this.isDataLoading = false)
      )
    else
      this.addSubscriber(
        this.kiiApiUser.detachRole(userId,roleId).subscribe(res => {
          this.isDataLoading = false;
        }, error => {
          event.source.toggle();  //Undo in case of error
        }, () => this.isDataLoading = false)
      )      
  }

  /**Opens a confirm dialog and deletes the specified user if confirmed */
  onDelete(user:IUser) {
    
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      disableClose:true,
      panelClass: "admin-theme",
      data: {title: "kiilib.confirm.title", text: "kiilib.confirm.text"}
    })
    this.addSubscriber(
      dialogRef.afterClosed().subscribe((result:boolean) => {
        if (result) 
        this.isDataLoading = true;
          this.addSubscriber(
            this.kiiApiUser.delete(new User(user)).subscribe(res => {
              this.deleteRow(user.id);
              this.isDataLoading = false;
            }, () => this.isDataLoading = false))
      })
    )
  }

  /** */
  enableAccount(change : MatCheckboxChange, user:IUser) {
    user.isEmailValidated = change.checked;
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiUser.update(user).subscribe(res => {
        this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    )

  }
}
