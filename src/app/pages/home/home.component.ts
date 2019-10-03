import { Component, OnInit } from '@angular/core';
import { KiiMiscService } from '../../_kiilib/_services/kii-misc.service';
import { KiiApiSettingService } from '../../_kiilib/_services/kii-api-setting.service';
import { KiiBaseAbstract } from '../../_kiilib/_abstracts/kii-base.abstract';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends KiiBaseAbstract implements OnInit {

  constructor(private kiiMisc: KiiMiscService,              
              private kiiApiSetting: KiiApiSettingService) { super()}

  ngOnInit() {
    //Apply SEO
    this.addSubscriber(
      this.kiiApiSetting.onChange().subscribe(res => {
        this.kiiMisc.seo(this.kiiApiSetting.getByKey('title').value,this.kiiApiSetting.getByKey('description').value,this.kiiApiSetting.getByKey('url_image').value,'');
      })
    )

  }


}
