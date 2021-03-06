import { Component, OnInit } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';
import { Setting } from '../../../_models/setting';
import { KiiApiSettingService } from '../../../_services/kii-api-setting.service';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';
import { KiiApiPageService } from '../../../_services/kii-api-page.service';
import { Page } from '../../../../_kiilib/_models/page';

@Component({
  selector: 'app-kii-admin-settings',
  templateUrl: './kii-admin-settings.component.html',
  styleUrls: ['./kii-admin-settings.component.scss']
})
export class KiiAdminSettingsComponent extends KiiBaseAbstract implements OnInit {
  /**Contains the validators for each field */
  validators : ValidatorFn[] = [];

  /**Contains settings for current lang */
  settings : Setting[];

  /**Shows spinner when loading */
  loading :boolean = false;

  constructor(private kiiApiSetting: KiiApiSettingService, private kiiApiPage: KiiApiPageService) { super() }

  ngOnInit() {
    this.setValidators();
    //Reload settings in case that user has other language
    this.load();

    this.addSubscriber(
      this.kiiApiSetting.onChange().subscribe(res => {
        this.settings = this.kiiApiSetting.get();
      })
    )
  }

  /**Load all settings with the right language */
  load() {
    this.loading = true;
    this.addSubscriber(
      this.kiiApiSetting.load().subscribe(res => {
        this.settings = res;
        this.kiiApiSetting.set(res);
        this.loading = false;
      }, () => this.loading = false)
    )
  }


  /**Returns value of a setting */
  getSettingValue(key:string) {
    return this.kiiApiSetting.getByKey(key).value;
  }

  /**Sets all validators for each field */
  setValidators() {
    //General part
    this.validators['companyPhone'] = Validators.compose([
      Validators.required, Validators.pattern(/^[0-9]+$/)   
    ]);
    this.validators['companyEmail']= Validators.compose([
      Validators.required, Validators.email   
    ]);
    this.validators['companyAddress']= Validators.compose([
      Validators.required, Validators.minLength(10), Validators.pattern(/^.*;.*;.*/)   
    ]);
    this.validators['companyTimetable']= Validators.compose([
      Validators.required, Validators.minLength(10)   
    ]);
    this.validators['gmapLatLng']=  Validators.compose([
      Validators.required, Validators.pattern(/^[0-9]+\.[0-9]+,[0-9]+\.[0-9]+$/)   
    ]);
    this.validators['gmapZoom']=  Validators.compose([
      Validators.required, Validators.pattern(/^[0-9]+$/),Validators.min(10),Validators.max(20)   
    ]);

    //SEO part
    this.validators['title']= Validators.compose([
      Validators.required, Validators.minLength(30),Validators.maxLength(60)   //Title must have between 30 and 60 chars
    ]);
    this.validators['description']= Validators.compose([
      Validators.required, Validators.minLength(260),Validators.maxLength(300)   //Description must have between 260 and 300 chars
    ]);     
    this.validators['url']= Validators.compose([
      Validators.required, Validators.pattern("https://www.*")   
    ]);
    this.validators['sitename']= Validators.compose([
      Validators.required, Validators.minLength(2)   
    ]);
    this.validators['fbid']= Validators.compose([
      Validators.required, Validators.pattern(/^[0-9]+$/) , Validators.minLength(16)
    ]);

    //Social part
    this.validators['linkFacebook'] = Validators.compose([
      Validators.pattern("https://www.facebook.com/.*"),
    ]);
    this.validators["linkGoogleplus"] = Validators.compose([
      Validators.pattern("https://plus.google.com/.*"),
    ]);
    this.validators["linkInstagram"] = Validators.compose([
      Validators.pattern("https://www.instagram.com/.*"),
    ]);
    this.validators["linkLinkedin"] = Validators.compose([
      Validators.pattern("https://www.linkedin.com/.*"),
    ]);

    this.validators["linkTwitter"] = Validators.compose([
      Validators.pattern("https://www.twitter.com/.*"),
    ]);

    this.validators["linkYoutube"] = Validators.compose([
      Validators.pattern("https://www.youtube.com/.*"),
    ]);
  }

  /**Saves the setting update */
  save(value:any, key:string) {
    this.loading = true;
    let mySetting = this.kiiApiSetting.getByKey(key);
    mySetting.value = value.result;

    this.addSubscriber(
      this.kiiApiSetting.update(mySetting).subscribe(res => {
         this.kiiApiSetting.refresh(res);
         this.loading = false;
      }, () => this.loading = false)
    )
  }

  /**Gets the image from a key */
  getImage(key:string) {
    let mySetting = this.kiiApiSetting.getByKey(key);
    return mySetting.value;
  }

  /**Saves the image of a key */
  saveImage(image:string, key:string) {
    let mySetting = this.kiiApiSetting.getByKey(key);
    mySetting.value = image;

    this.loading = true;
    this.addSubscriber(
      this.kiiApiSetting.update(mySetting).subscribe(res => {
         this.kiiApiSetting.refresh(res);
         this.loading = false;
      }, () => this.loading = false)
    )
  }

  /**Saves SEO settings */
  saveSeo(result:any) {
    this.loading = true;
    this.addSubscriber(
      this.kiiApiPage.update(new Page(result)).subscribe(res => {
        this.kiiApiPage.refresh(res);
        this.loading = false;
      },()=> this.loading = false)
    )
  }


}
