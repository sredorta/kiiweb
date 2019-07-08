import { Component, OnInit, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { KiiTableAbstract } from '../../../_abstracts/kii-table.abstract';
import { KiiApiAlertService } from '../../../_services/kii-api-alert.service';
import { Alert } from '../../../_models/alert';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { User } from '../../../_models/user';

@Component({
  selector: 'kii-alerts',
  templateUrl: './kii-alerts.component.html',
  styleUrls: ['./kii-alerts.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],    
})
export class KiiAlertsComponent extends KiiTableAbstract implements OnInit {
  
  
  /**When articles are loading we show spinner with this variable */
  isDataLoading : boolean = false;

  /**Contains current language */
  currentLang : string;

  loggedInUser: User = new User(null);

  constructor(private kiiApiAlert: KiiApiAlertService,
              private kiiApiLang: KiiApiLanguageService,
              private kiiApiAuth: KiiApiAuthService,
              private changeDetectorRef: ChangeDetectorRef) { super() }

  ngOnInit() {
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        console.log("Recieved new loggedInUser", res);
        this.loggedInUser = res;
        this.displayedColumns = ['id', 'message', 'createdAt','isRead'];
        this.initTable(res.alerts.sort((a,b) => b.id - a.id));
        this.tableSettings();
      })
    )
    //Update nice time format language when we change language
    this.addSubscriber(
      this.kiiApiLang.onChange().subscribe(res => {
            this.currentLang = res;
      })
    )
  }
  
  /**Track by id */
  trackById(index:number,item:any) {
    return item.id;
  }

  /**Defines all filtering and sorting table settings */
  tableSettings() {
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.title.toLowerCase().includes(filter) || data.id.toLowerCase().includes(filter);
    };
    //Define the sorting if special
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
         case 'id': return item.id;
         case 'title': return item.title;
         default: return item[property];
      }
    };
  }

  /**When user deletes an alert */
  onDeleteAlert(alert:Alert) {
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiAlert.delete(alert).subscribe(res => {
        const index = this.loggedInUser.alerts.findIndex(obj => obj.id == alert.id);
        if (index>=0) {
          this.loggedInUser.alerts.slice(index,1);
          this.deleteRow(alert.id);
          this.kiiApiAuth.setLoggedInUser(this.loggedInUser);
        }
        this.isDataLoading = false;
      }, () => this.isDataLoading = false)
    )
  }

  /**Marks alert as read */
  markAsRead(alert:Alert) {
    alert.isRead = !alert.isRead;
    console.log(alert);
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiAlert.update(alert).subscribe(res => {
        console.log("Recieved alert",res);
        let index = this.loggedInUser.alerts.findIndex(obj => obj.id == res.id);
        if (index>=0) {
          this.loggedInUser.alerts[index] = res;
          this.kiiApiAuth.setLoggedInUser(this.loggedInUser);
        }
        this.isDataLoading = false;
      }, (error) => {
        console.log("GOT ERROR:", error);
      }, () => this.isDataLoading = false)
    )
  }

}
