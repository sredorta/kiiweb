import { Component, OnInit } from '@angular/core';
import { KiiTableAbstract } from '../../../_abstracts/kii-table.abstract';
import { KiiApiAlertService } from '../../../_services/kii-api-alert.service';
import { Alert } from '../../../_models/alert';
import { KiiApiLanguageService } from 'src/app/_kiilib/_services/kii-api-language.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { element } from 'protractor';
import { KiiApiAuthService } from 'src/app/_kiilib/_services/kii-api-auth.service';
import { User } from 'src/app/_kiilib/_models/user';

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
  
  /**Contains user alerts */
  alerts: Alert[] = [];
  
  /**When articles are loading we show spinner with this variable */
  isDataLoading : boolean = false;

  /**Contains current language */
  currentLang : string;

  loggedInUser: User = new User(null);

  constructor(private kiiApiAlert: KiiApiAlertService,
              private kiiApiLang: KiiApiLanguageService,
              private kiiApiAuth: KiiApiAuthService) { super() }

  ngOnInit() {
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
        this.alerts = res.alerts;
        this.displayedColumns = ['id', 'message', 'createdAt','isRead'];
        this.initTable(this.alerts);
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
    console.log("deleteing", alert);
  }

  /**Marks alert as read */
  markAsRead(alert:Alert) {
    console.log("marking as read : ", alert);
    alert.isRead = true;
    //this.addSubscriber(
      this.kiiApiAlert.update(alert).subscribe(res => {
        console.log(res);
        console.log("HERE!");
      })
    //)
  }
}
