import { Component, OnInit } from '@angular/core';
import { KiiApiSettingService } from '../../../../_kiilib/_services/kii-api-setting.service';
import { MatSlideToggle } from '@angular/material';
import { Setting } from '../../../../_kiilib/_models/setting';
import { KiiBaseAbstract } from 'src/app/_kiilib/_abstracts/kii-base.abstract';

@Component({
  selector: 'app-kii-admin-popup',
  templateUrl: './kii-admin-popup.component.html',
  styleUrls: ['./kii-admin-popup.component.scss']
})
export class KiiAdminPopupComponent extends KiiBaseAbstract implements OnInit {

  enabled : boolean;
  setting : Setting;
  isLoading:boolean = false;

  constructor(private kiiApiSetting : KiiApiSettingService) { 
    super();
    this.setting = this.kiiApiSetting.getByKey("popup-show");
      if (this.setting.value == "true" || this.setting.value == "1") {
        this.enabled = true;
        
      }
  }

  ngOnInit() {
  }

  onStatusChange(value: MatSlideToggle) {
    console.log(value);
    if (value.checked == false) {
      this.setting.value = "false";
    } else {
      this.setting.value = "true";
    }
    this.isLoading = true;
    this.addSubscriber(
      this.kiiApiSetting.update(this.setting).subscribe(res => {
        this.isLoading = false;
      }, () => this.isLoading = false)
    );
  }

}
