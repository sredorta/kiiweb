import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { KiiApiLanguageService } from './kii-api-language.service';
import { TranslateService } from '@ngx-translate/core';
import { KiiMiscService } from './kii-misc.service';


//NOTE: This service is only running on the browser

@Injectable({
  providedIn: 'root'
})
export class KiiPwaService {

  promptEvent : any = null;

  constructor(private swUpdate: SwUpdate, 
    private kiiMisc : KiiMiscService) {

    //Tell if SW is available
    this.kiiMisc.hasServiceWorker = this.swUpdate.isEnabled;
    //Handle version updates if required we trigger then event
    swUpdate.available.subscribe(event => {
      this.kiiMisc.AppUpdate();
    });

    //Handle install button and tell that we show the install bottom sheet
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
      this.kiiMisc.AppCanInstall();
    });

    //When we are asked to install the app so we do it
    this.kiiMisc.onAppInstall().subscribe(res => {
      if ((res == true) && (this.promptEvent!=null)) {
        this.promptEvent.prompt();
      }
    })

  }
}
