import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { KiiBaseAuthAbstract } from '../../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../../_models/user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { KiiConfirmDialogComponent } from '../../kii-confirm-dialog/kii-confirm-dialog.component';
import { KiiProfileFormComponent } from '../../_forms/kii-profile-form/kii-profile-form.component';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { KiiSocketService } from '../../../_services/kii-socket.service';

@Component({
  selector: 'kii-profile',
  templateUrl: './kii-profile.component.html',
  styleUrls: ['./kii-profile.component.scss']
})
export class KiiProfileComponent extends KiiBaseAuthAbstract implements OnInit {

  currentLang :string = ""; 

  @ViewChild(KiiProfileFormComponent,{static:false}) profileForm : KiiProfileFormComponent;

  constructor(private kiiApiAuth: KiiApiAuthService,
              @Inject(PLATFORM_ID) private platformId: any,
              private router : Router,
              private kiiApiLang : KiiApiLanguageService,
              private kiiSocket: KiiSocketService,
              private dialog : MatDialog) { super(kiiApiAuth,platformId) }

  ngOnInit() {
    this.currentLang = this.kiiApiLang.get();
    this.getLoggedInUserSubscription();
  }

  /**Logout user */
  onLogout() {
    if (isPlatformBrowser(this.platformId)) {
      User.removeToken();
    }
    this.kiiApiAuth.setLoggedInUser(new User(null));
    this.router.navigate([""]);
  }

  /**deletes the auth account */
  onDelete() {
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      disableClose:true,
      panelClass: "default-theme",
      data: {title: "kiilib.confirm.title", text: "kiilib.confirm.text"}
    })
    this.addSubscriber(
      dialogRef.afterClosed().subscribe((result:boolean) => {
        if (result) 
          this.addSubscriber(
            this.kiiApiAuth.deleteAuthUser().subscribe(res => {
              this.onLogout();
            }))
      })
    )
  }

  /**When the form is valid and submitted */
  onSubmit(value:any) {
    this.profileForm.isFormLoading = true;
      this.addSubscriber(this.kiiApiAuth.updateAuthUser(value).subscribe(res => {
        this.kiiApiAuth.setLoggedInUser(new User(res));
        this.profileForm.disableControls();
        this.profileForm.resetPasswords();
        this.profileForm.isFormLoading = false;
      }, () => {
        this.profileForm.isFormLoading = false;
      })
    );


  }

}
