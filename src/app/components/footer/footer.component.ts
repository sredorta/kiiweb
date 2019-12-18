import { Component, OnInit } from '@angular/core';
import { KiiApiSettingService } from '../../_kiilib/_services/kii-api-setting.service';
import { KiiBaseAbstract } from '../../_kiilib/_abstracts/kii-base.abstract';
import { Setting } from '../../_kiilib/_models/setting';
import { User } from '../../_kiilib/_models/user';
import { KiiApiAuthService } from '../../_kiilib/_services/kii-api-auth.service';
import { MatDialog } from '@angular/material';
import { KiiTermsDialogComponent } from '../../_kiilib/_components/kii-terms-dialog/kii-terms-dialog.component';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends KiiBaseAbstract implements OnInit  {

  settings : Setting[] = [];
  loggedInUser : User = new User(null);

  constructor(private kiiApiSetting : KiiApiSettingService, private kiiApiAuth: KiiApiAuthService, private dialog:MatDialog) { super() }

  ngOnInit() {
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(res => {
        this.loggedInUser = res;
      })
    )
    this.addSubscriber(
      this.kiiApiSetting.onChange().subscribe(res => {
        this.settings = res;
      })
    )
  }

  getPhone() {
    if (this.settings.length) {
      return this.settings.find(obj => obj.key == "companyPhone").value;
    } else {
      return "";
    }
  }

  getEmail() {
    if (this.settings.length) {
      return this.settings.find(obj => obj.key == "companyEmail").value;
    } else {
      return "";
    }
  }

  getAddress(index:number) {
    if (this.settings.length) {
      let address = this.settings.find(obj => obj.key == "companyAddress").value;

      let result = address.split(";");
      if (result[index]) {
        return result[index];
      }
      return "";
    } else {
      return "";
    }
  }

  /**Opens temrs and conditions dialog */  
  openTermsAndConditionsDialog(): void {
    let dialogRef = this.dialog.open(KiiTermsDialogComponent, {
      panelClass: '',
      data:  {'noButtons':true},
      maxHeight:'90vh',
      minHeight:'300px',
      minWidth:'320px',
    });
  }
}
