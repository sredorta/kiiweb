import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiSettingService } from '../../_services/kii-api-setting.service';

@Component({
  selector: 'kii-gmap',
  templateUrl: './kii-gmap.component.html',
  styleUrls: ['./kii-gmap.component.scss']
})
export class KiiGmapComponent extends KiiBaseAbstract implements OnInit {
  latitude:number;
  longitude:number;
  zoom:number;
  /**Gmaps can only be seen in browser as on the server side is using window. This variable is used to hide the gmaps in case of server */
  isBrowser :boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId,private kiiApiSetting: KiiApiSettingService) { super()}

  ngOnInit() {

    //If settings changes we update
    this.addSubscriber(
        this.kiiApiSetting.onChange().subscribe(res => {
            this.config();
        })
    )     

  }

  config() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    let latlng = this.kiiApiSetting.getByKey("gmapLatLng").value;
    this.latitude = parseFloat(latlng.split(",")[0]);
    this.longitude=parseFloat(latlng.split(",")[1]);;
    this.zoom = parseFloat(this.kiiApiSetting.getByKey("gmapZoom").value);
  }

}
