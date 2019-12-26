import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Translations
import {TranslateModule} from '@ngx-translate/core';

//MATERIAL DESIGN
//Material design
import {MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatPaginatorIntl,
  MatSnackBar,
  MatDialogRef,
  MatBottomSheetRef} from '@angular/material';

//Font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//EDITOR
//import { AngularEditorModule } from '@kolkov/angular-editor';

//GMAPS
import {AgmCoreModule} from '@agm/core';

//SOCIAL SHARE
//import {ShareButtonsModule} from '@ngx-share/buttons';
//import {ShareButtonModule} from '@ngx-share/button';
import { ShareModule } from '@ngx-share/core';

//Google charts
import { GoogleChartsModule } from 'angular-google-charts';

//MICRODATA JSON-LD
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { KiiAppComponent } from './_kiilib/_components/kii-app/kii-app.component';
import { KiiFooterComponent } from './_kiilib/_components/kii-footer/kii-footer.component';
import { KiiSidenavComponent } from './_kiilib/_components/kii-sidenav/kii-sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { LocalizeRouterModule } from './_kiilib/_libraries/localize-router';
import { RouterModule } from '@angular/router';
import {routes} from './app-routing.module';
import { PrixComponent } from './pages/prix/prix.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';
import { KiiLanguageSelectorComponent } from './_kiilib/_components/kii-language-selector/kii-language-selector.component';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { KiiBottomSheetSoftwareUpdateComponent } from './_kiilib/_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { KiiLoginFormComponent } from './_kiilib/_components/_forms/kii-login-form/kii-login-form.component';
import { KiiSignupFormComponent } from './_kiilib/_components/_forms/kii-signup-form/kii-signup-form.component';
import { KiiSpinnerComponent } from './_kiilib/_components/kii-spinner/kii-spinner.component';
import { KiiSpinnerOverlayComponent } from './_kiilib/_components/kii-spinner-overlay/kii-spinner-overlay.component';
import { KiiTermsDialogComponent } from './_kiilib/_components/kii-terms-dialog/kii-terms-dialog.component';
import { ReactiveFormsModule, NgSelectOption, FormsModule } from '@angular/forms';
import { KiiInputDefaultValueDirective } from './_kiilib/_directives/kii-input-default-value.directive';
import { KiiInputDigitOnlyDirective } from './_kiilib/_directives/kii-input-digit-only.directive';
import { KiiInputErrorDirective } from './_kiilib/_directives/kii-input-error.directive';
import { KiiLoginSignupComponent } from './_kiilib/_components/_pages/kii-login-signup/kii-login-signup.component';
import { KiiPassportsComponent } from './_kiilib/_components/kii-passports/kii-passports.component';
import { KiiHttpErrorComponent } from './_kiilib/_components/kii-http-error/kii-http-error.component';
import { KiiHttpInterceptor } from './_kiilib/_utils/kii-http-interceptor';
import { KiiNotFoundComponent } from './_kiilib/_components/_pages/kii-not-found/kii-not-found.component';
import { KiiEmailValidateComponent } from './_kiilib/_components/_pages/kii-email-validate/kii-email-validate.component';
import { KiiResetPasswordComponent } from './_kiilib/_components/_pages/kii-reset-password/kii-reset-password.component';
import { KiiResetPasswordFormComponent } from './_kiilib/_components/_forms/kii-reset-password-form/kii-reset-password-form.component';
import { KiiLoginOauthComponent } from './_kiilib/_components/_pages/kii-login-oauth/kii-login-oauth.component';
import { KiiFillSideComponent } from './_kiilib/_components/kii-fill-side/kii-fill-side.component';
import { KiiProfileComponent } from './_kiilib/_components/_pages/kii-profile/kii-profile.component';
import { KiiConfirmDialogComponent } from './_kiilib/_components/kii-confirm-dialog/kii-confirm-dialog.component';
import { KiiNiceDateFormatPipe } from './_kiilib/_pipes/kii-nice-date-format.pipe';
import { KiiMobileFormatPipe } from './_kiilib/_pipes/kii-mobile-format.pipe';
import { KiiProfileFormComponent } from './_kiilib/_components/_forms/kii-profile-form/kii-profile-form.component';
import { KiiAdminMenuComponent } from './_kiilib/_components/_pages/kii-admin-menu/kii-admin-menu.component';
import { KiiAdminSettingsComponent } from './_kiilib/_components/_pages/kii-admin-settings/kii-admin-settings.component';
import { KiiItemFormComponent } from './_kiilib/_components/_forms/kii-item-form/kii-item-form.component';
import { KiiAdminUsersComponent } from './_kiilib/_components/_pages/kii-admin-users/kii-admin-users.component';
import { KiiArticleComponent } from './_kiilib/_components/kii-article/kii-article.component';
import { KiiArticleSummaryComponent } from './_kiilib/_components/kii-article-summary/kii-article-summary.component';
import { KiiAdminArticlesComponent } from './_kiilib/_components/_pages/kii-admin-articles/kii-admin-articles.component';
import { KiiBlogComponent } from './_kiilib/_components/_pages/kii-blog/kii-blog.component';
import { KiiArticleDetailComponent } from './_kiilib/_components/_pages/kii-article-detail/kii-article-detail.component';
import { KiiArticleSummaryFormComponent } from './_kiilib/_components/_forms/kii-article-summary-form/kii-article-summary-form.component';
import { KiiImageUploadComponent } from './_kiilib/_components/kii-image-upload/kii-image-upload.component';
import { KiiAdminEmailsComponent } from './_kiilib/_components/_pages/kii-admin-emails/kii-admin-emails.component';
import { KiiEmailNewFormComponent } from './_kiilib/_components/_forms/kii-email-new-form/kii-email-new-form.component';
import { KiiEmailPreviewComponent } from './_kiilib/_components/kii-email-preview/kii-email-preview.component';
import { KiiClickStopPropagationDirective } from './_kiilib/_directives/kii-click-stop-propagation.directive';
import { KiiEmailEditFormComponent } from './_kiilib/_components/_forms/kii-email-edit-form/kii-email-edit-form.component';
import { KiiContactComponent } from './_kiilib/_components/_pages/kii-contact/kii-contact.component';
import { KiiContactFormComponent } from './_kiilib/_components/_forms/kii-contact-form/kii-contact-form.component';
import { KiiGmapComponent } from './_kiilib/_components/kii-gmap/kii-gmap.component';
import { environment } from '../environments/environment';
import { KiiShareComponent } from './_kiilib/_components/kii-share/kii-share.component';
import { KiiBottomSheetCookiesComponent } from './_kiilib/_components/kii-bottom-sheet-cookies/kii-bottom-sheet-cookies.component';
import { KiiAlertsComponent } from './_kiilib/_components/_pages/kii-alerts/kii-alerts.component';
import { KiiChatComponent } from './_kiilib/_components/kii-chat/kii-chat.component';
import { KiiChatDialogComponent } from './_kiilib/_components/kii-chat-dialog/kii-chat-dialog.component';
import { KiiAdminChatsComponent } from './_kiilib/_components/_pages/kii-admin-chats/kii-admin-chats.component';
import { KiiEmailComposeFormComponent } from './_kiilib/_components/_forms/kii-email-compose-form/kii-email-compose-form.component';
import { KiiAdminStatsComponent } from './_kiilib/_components/_pages/kii-admin-stats/kii-admin-stats.component';
import { KiiStatsIndicatorComponent } from './_kiilib/_components/kii-stats-indicator/kii-stats-indicator.component';
import { KiiThousandsSuffixPipe } from './_kiilib/_pipes/kii-thousands-suffix.pipe';
import { KiiAdminDiskComponent } from './_kiilib/_components/_pages/kii-admin-disk/kii-admin-disk.component';
import { KiiFileSizePipe } from './_kiilib/_pipes/kii-file-size.pipe';
import { AngularEditorComponent } from './_kiilib/_libraries/angular-editor/angular-editor.component';
import { AngularEditorToolbarComponent } from './_kiilib/_libraries/angular-editor/angular-editor-toolbar.component';
import { AeSelectComponent } from './_kiilib/_libraries/angular-editor/ae-select/ae-select.component';
import { KiiVideoGalleryComponent } from './_kiilib/_components/kii-video-gallery/kii-video-gallery.component';
import { KiiVideoGalleryDialogComponent } from './_kiilib/_components/kii-video-gallery-dialog/kii-video-gallery-dialog.component';
import { KiiImageGalleryDialogComponent } from './_kiilib/_components/kii-image-gallery-dialog/kii-image-gallery-dialog.component';
import { KiiLinkDialogComponent } from './_kiilib/_components/kii-link-dialog/kii-link-dialog.component';
import { KiiScrollDirective } from './_kiilib/_directives/kii-scroll.directive';
import { KiiPopupDialogComponent } from './_kiilib/_components/kii-popup-dialog/kii-popup-dialog.component';
import { KiiAdminPopupComponent } from './_kiilib/_components/_pages/kii-admin-popup/kii-admin-popup.component';
import { KiiSeoFormComponent } from './_kiilib/_components/_forms/kii-seo-form/kii-seo-form.module';
import { KiiHeaderComponent } from './_kiilib/_components/kii-header/kii-header.component';
import { HeaderComponent } from './components/header/header.component';
import { DeviceDetectorService, DeviceDetectorModule } from 'ngx-device-detector';
import { KiiNewsletterComponent } from './_kiilib/_components/kii-newsletter/kii-newsletter.component';
import { DemoComponent } from './pages/demo/demo.component';
import { KiiElementComponent } from './_kiilib/_components/kii-element/kii-element.component';
import { KiiSearchComponent } from './_kiilib/_components/kii-search/kii-search.component';



//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

@NgModule({
  declarations: [
    AppComponent,
    KiiAppComponent,
    KiiFooterComponent,
    KiiSidenavComponent,
    FooterComponent,
    SidenavComponent,
    HomeComponent,
    PrixComponent,
    RealisationsComponent,
    KiiLanguageSelectorComponent,
    KiiBottomSheetSoftwareUpdateComponent,
    KiiLoginFormComponent,
    KiiSignupFormComponent,
    KiiSpinnerComponent,
    KiiSpinnerOverlayComponent,
    KiiTermsDialogComponent,
    KiiInputDefaultValueDirective,
    KiiInputDigitOnlyDirective,
    KiiInputErrorDirective,
    KiiLoginSignupComponent,
    KiiPassportsComponent,
    KiiHttpErrorComponent,
    KiiNotFoundComponent,
    KiiEmailValidateComponent,
    KiiResetPasswordComponent,
    KiiResetPasswordFormComponent,
    KiiLoginOauthComponent,
    KiiFillSideComponent,
    KiiProfileComponent,
    KiiConfirmDialogComponent,
    KiiNiceDateFormatPipe,
    KiiMobileFormatPipe,
    KiiProfileFormComponent,
    KiiAdminMenuComponent,
    KiiAdminSettingsComponent,
    KiiItemFormComponent,
    KiiAdminUsersComponent,
    KiiSeoFormComponent,
    KiiArticleComponent,
    KiiArticleSummaryComponent,
    KiiAdminArticlesComponent,
    KiiBlogComponent,
    KiiArticleDetailComponent,
    KiiArticleSummaryFormComponent,
    KiiImageUploadComponent,
    KiiAdminEmailsComponent,
    KiiEmailNewFormComponent,
    KiiEmailPreviewComponent,
    KiiClickStopPropagationDirective,
    KiiEmailEditFormComponent,
    KiiContactComponent,
    KiiContactFormComponent,
    KiiGmapComponent,
    KiiShareComponent,
    KiiBottomSheetCookiesComponent,
    KiiAlertsComponent,
    KiiChatComponent,
    KiiChatDialogComponent,
    KiiAdminChatsComponent,
    KiiEmailComposeFormComponent,
    KiiAdminStatsComponent,
    KiiStatsIndicatorComponent,
    KiiThousandsSuffixPipe,
    KiiAdminDiskComponent,
    KiiFileSizePipe,
    AngularEditorComponent,
    AngularEditorToolbarComponent,
    AeSelectComponent,
    KiiVideoGalleryComponent,
    KiiVideoGalleryDialogComponent,
    KiiImageGalleryDialogComponent,
    KiiLinkDialogComponent,
    KiiScrollDirective,
    KiiPopupDialogComponent,
    KiiAdminPopupComponent,
    KiiHeaderComponent,
    HeaderComponent,
    KiiNewsletterComponent,
    DemoComponent,
    KiiElementComponent,
    KiiSearchComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgtUniversalModule,
    FormsModule,
    ReactiveFormsModule,  //Reactive forms
    TranslateModule.forChild(), //Translations
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
    //AngularEditorModule,
    GoogleChartsModule.forRoot(), //Google charts
    AgmCoreModule.forRoot( { //GMAPS
      apiKey: environment.gmapsKey
    }),
    FontAwesomeModule,
    ShareModule,
    //JSON-LD
    NgxJsonLdModule,
    //SocketIoModule.forRoot({url: environment.socketURL,options:{secure:true}}),
    [  MatAutocompleteModule, //MATERIAL DESIGN
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatStepperModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule],    
    //EOF MATERIAL DESIGN
  ],
  entryComponents: [KiiSpinnerOverlayComponent, KiiTermsDialogComponent, KiiConfirmDialogComponent, KiiChatDialogComponent,KiiImageGalleryDialogComponent, KiiVideoGalleryDialogComponent, KiiLinkDialogComponent,  KiiPopupDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
