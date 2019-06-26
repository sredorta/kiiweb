import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAuthAbstract } from 'src/app/_kiilib/_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from 'src/app/_kiilib/_services/kii-api-auth.service';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../../_models/user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { KiiConfirmDialogComponent } from '../../kii-confirm-dialog/kii-confirm-dialog.component';

@Component({
  selector: 'kii-profile',
  templateUrl: './kii-profile.component.html',
  styleUrls: ['./kii-profile.component.scss']
})
export class KiiProfileComponent extends KiiBaseAuthAbstract implements OnInit {

  constructor(private kiiApiAuth: KiiApiAuthService,
              @Inject(PLATFORM_ID) private platformId: any,
              private router : Router,
              private dialog : MatDialog) { super(kiiApiAuth,platformId) }

  ngOnInit() {
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
}
