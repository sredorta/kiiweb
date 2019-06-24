import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { KiiApiLanguageService } from './kii-api-language.service';
import { TranslateService } from '@ngx-translate/core';
import { KiiMiscService } from './kii-misc.service';

@Injectable({
  providedIn: 'root'
})
export class KiiPwaService {

  promptEvent : any = null;

  constructor(private swUpdate: SwUpdate, 
    private snackBar : MatSnackBar, 
    private kiiApiLang : KiiApiLanguageService, 
    private translate:TranslateService,
    private kiiMisc : KiiMiscService) {

    console.log("HANDLING VERSIONS !");

    //Tell if SW is available
    this.kiiMisc.hasServiceWorker = this.swUpdate.isEnabled;
    //Handle version updates if required we trigger then event
    swUpdate.available.subscribe(event => {
      this.kiiMisc.AppUpdate();
    });

    //Handle install button
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
      this.kiiMisc.canInstall = true;
    });

    //When we are asked to install the app we do it
    this.kiiMisc.onAppInstall().subscribe(res => {
      if ((res == true) && (this.promptEvent!=null)) {
        console.log("INSTALLING !!!!");
        this.promptEvent.prompt();
      }
    })

  }
}
