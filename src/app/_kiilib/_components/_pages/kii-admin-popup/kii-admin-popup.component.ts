import { Component, OnInit, ViewChild } from '@angular/core';
import { KiiApiSettingService } from '../../../../_kiilib/_services/kii-api-setting.service';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material';
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
  @ViewChild(MatSlideToggle, {static:false}) toggle : MatSlideToggle;

  constructor(private kiiApiSetting : KiiApiSettingService) { 
    super();
    this.setting = this.kiiApiSetting.getByKey("popup-show");
      if (this.setting.value != "disabled") {
        this.enabled = true;
        
      }
  }

  ngOnInit() {
  }

  onStatusChange(value: MatSlideToggleChange) {
    console.log(value);
    if (value.checked == true) {
      this.setting.value = Math.random().toString(36).replace(/[^a-z]+/g, '');
    } else {
      this.setting.value = "disabled";
    }

    this.isLoading = true;
    this.addSubscriber(
      this.kiiApiSetting.updateDialog(this.setting).subscribe(res => {
        this.isLoading = false;
      },
      error => {
        value.source.toggle();
        this.isLoading = false;
      },
       () => this.isLoading = false)
    );
  }

}
