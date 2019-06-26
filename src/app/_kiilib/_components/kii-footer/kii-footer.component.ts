import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Setting } from '../../_models/setting';
import { KiiApiSettingService } from '../../_services/kii-api-setting.service';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiBaseAuthAbstract } from '../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';

export interface SocialLink {
  name : string;
  link: string;
  icon: string[];
}

@Component({
  selector: 'kii-footer',
  templateUrl: './kii-footer.component.html',
  styleUrls: ['./kii-footer.component.scss']
})
export class KiiFooterComponent extends KiiBaseAuthAbstract implements OnInit {
  /**Includes all social links */
  links : SocialLink[] = [];

  /**Link to kubiiks website */
  kubiiksLink : string = "https://www.kubiiks.com";

  constructor(private kiiApiSetting : KiiApiSettingService, 
              private kiiApiAuth: KiiApiAuthService,
              @Inject(PLATFORM_ID) private platformId: any) {super(kiiApiAuth,platformId) }

  ngOnInit() {
    this.getLoggedInUserSubscription();
    //If settings changes we update
    this.setLinks();
    this.addSubscriber(
      this.kiiApiSetting.onChange().subscribe(res => {
        this.setLinks();
      })
    )    
  }


  /**Sets all the links depending on settings */
  setLinks() {
    this.links = [];
    this.links.push({
        name: "facebook",
        link: this.kiiApiSetting.getByKey("linkFacebook").value,
        icon: ['fab','fa-facebook-f']
    });

    this.links.push({
      name: "instagram",
      link: this.kiiApiSetting.getByKey("linkInstagram").value,
      icon: ['fab','fa-instagram']      
    });

    this.links.push({
      name: "linkedin",
      link: this.kiiApiSetting.getByKey("linkLinkedin").value,
      icon: ['fab','fa-linkedin-in']      
    });

    this.links.push({
      name: "twitter",
      link: this.kiiApiSetting.getByKey("linkTwitter").value,
      icon: ['fab','fa-twitter']      
    });

    this.links.push({
      name: "googleplus",
      link: this.kiiApiSetting.getByKey("linkGoogleplus").value,
      icon: ['fab','fa-google-plus-g']      
    });
    this.links.push({
      name: "youtube",
      link: this.kiiApiSetting.getByKey("linkYoutube").value,
      icon: ['fab','fa-youtube']      
    });
    //Remove all elements not having valid social link
    this.links = this.links.filter(obj => obj.link!="");
  }


}
