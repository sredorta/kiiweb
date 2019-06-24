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
  MatPaginatorIntl} from '@angular/material';


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
    RealisationsComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
