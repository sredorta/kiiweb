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
import { HttpClientModule } from '@angular/common/http';
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
    KiiSpinnerOverlayComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
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
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
