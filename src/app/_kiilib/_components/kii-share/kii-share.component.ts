import { Component, OnInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import { KiiMiscService } from '../../_services/kii-misc.service';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { KiiApiStatsService } from '../../_services/kii-api-stats.service';
import { StatAction } from '../../_models/stat';
import { KiiApiSettingService } from '../../_services/kii-api-setting.service';
import { LocalizeRouterService } from '../../_libraries/localize-router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons/faRedditAlien';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import { faTumblr } from '@fortawesome/free-brands-svg-icons/faTumblr';
import { faPinterestP } from '@fortawesome/free-brands-svg-icons/faPinterestP';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons/faTelegramPlane';
import { faMix } from '@fortawesome/free-brands-svg-icons/faMix';
import { faXing } from '@fortawesome/free-brands-svg-icons/faXing';
import { faLine } from '@fortawesome/free-brands-svg-icons/faLine';

import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faExclamation } from '@fortawesome/free-solid-svg-icons/faExclamation';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { environment } from '../../../../environments/environment';
import { ShareService } from '@ngx-share/core';

@Component({
  selector: 'kii-share',
  templateUrl: './kii-share.component.html',
  styleUrls: ['./kii-share.component.scss']
})
export class KiiShareComponent extends KiiBaseAbstract implements OnInit {

  /**Route to point for the link */
  @Input() route : string = null;

  /**Url to point for the link, in case of null take current url */
  url : string = null;

  constructor(private kiiStats: KiiApiStatsService,
              private router: Router, 
              private kiiMisc : KiiMiscService, 
              private KiiApiSetting: KiiApiSettingService,
              private localize : LocalizeRouterService,
              public share: ShareService,
              library : FaIconLibrary,
              @Inject(PLATFORM_ID) private platformId: any ) { 
        super();
        const icons = [
          faFacebookF, faTwitter, faLinkedinIn, faGooglePlusG, faPinterestP, faRedditAlien, faTumblr,
          faWhatsapp, faVk, faFacebookMessenger, faTelegramPlane, faMix, faXing, faCommentAlt,  faLine,
          faEnvelope, faCheck, faPrint, faExclamation, faLink, faEllipsisH, faMinus
        ];
        
        library.addIconPacks(fab);
        library.addIcons(...icons);
  }

  ngOnInit() {
    this.url = environment.mainExtURL;
  }

  sendStats(social:string) {
      this.kiiStats.send(StatAction.SOCIAL_CLICK, social);
  }

  getUrl() {
    if (!this.route) {
      return this.url + this.router.url;
    } else {
      return this.url + this.route;
    }
  }
}
