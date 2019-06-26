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


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { KiiAppComponent } from './_kiilib/_components/kii-app/kii-app.component';
import { KiiFooterComponent } from './_kiilib/_components/kii-footer/kii-footer.component';
import { KiiSidenavComponent } from './_kiilib/_components/kii-sidenav/kii-sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { LocalizeRouterModule } from 'localize-router';
import { RouterModule } from '@angular/router';
import {routes} from './app-routing.module';
import { PrixComponent } from './pages/prix/prix.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';
import { KiiLanguageSelectorComponent } from './_kiilib/_components/kii-language-selector/kii-language-selector.component';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { KiiBottomSheetSoftwareUpdateComponent } from './_kiilib/_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { KiiBottomSheetSoftwareInstallComponent } from './_kiilib/_components/kii-bottom-sheet-software-install/kii-bottom-sheet-software-install.component';
import { KiiLoginFormComponent } from './_kiilib/_components/_forms/kii-login-form/kii-login-form.component';
import { KiiSignupFormComponent } from './_kiilib/_components/_forms/kii-signup-form/kii-signup-form.component';
import { KiiSpinnerComponent } from './_kiilib/_components/kii-spinner/kii-spinner.component';
import { KiiSpinnerOverlayComponent } from './_kiilib/_components/kii-spinner-overlay/kii-spinner-overlay.component';
import { KiiTermsDialogComponent } from './_kiilib/_components/kii-terms-dialog/kii-terms-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
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
    KiiBottomSheetSoftwareInstallComponent,
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
    KiiProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    ReactiveFormsModule,  //Reactive forms
    TranslateModule.forChild(), //Translations
    LocalizeRouterModule.forChild(routes),
    RouterModule.forChild(routes),
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
      MatTreeModule,
    ],    
    //EOF MATERIAL DESIGN
  ],
  entryComponents: [KiiSpinnerOverlayComponent, KiiTermsDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
