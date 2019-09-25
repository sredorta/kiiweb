import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KiiSidenavComponent } from './_kiilib/_components/kii-sidenav/kii-sidenav.component';
import { PrixComponent } from './pages/prix/prix.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';
import { KiiLoginSignupComponent } from './_kiilib/_components/_pages/kii-login-signup/kii-login-signup.component';
import { KiiNotFoundComponent } from './_kiilib/_components/_pages/kii-not-found/kii-not-found.component';
import { KiiEmailValidateComponent } from './_kiilib/_components/_pages/kii-email-validate/kii-email-validate.component';
import { KiiResetPasswordComponent } from './_kiilib/_components/_pages/kii-reset-password/kii-reset-password.component';
import { KiiLoginOauthComponent } from './_kiilib/_components/_pages/kii-login-oauth/kii-login-oauth.component';
import { KiiProfileComponent } from './_kiilib/_components/_pages/kii-profile/kii-profile.component';
import { KiiAdminMenuComponent } from './_kiilib/_components/_pages/kii-admin-menu/kii-admin-menu.component';
import { KiiAdminSettingsComponent } from './_kiilib/_components/_pages/kii-admin-settings/kii-admin-settings.component';
import { KiiAdminUsersComponent } from './_kiilib/_components/_pages/kii-admin-users/kii-admin-users.component';
import { KiiAdminArticlesComponent } from './_kiilib/_components/_pages/kii-admin-articles/kii-admin-articles.component';
import { KiiBlogComponent } from './_kiilib/_components/_pages/kii-blog/kii-blog.component';
import { KiiArticleDetailComponent } from './_kiilib/_components/_pages/kii-article-detail/kii-article-detail.component';
import { KiiAdminEmailsComponent } from './_kiilib/_components/_pages/kii-admin-emails/kii-admin-emails.component';
import { KiiContactComponent } from './_kiilib/_components/_pages/kii-contact/kii-contact.component';
import { KiiAlertsComponent } from './_kiilib/_components/_pages/kii-alerts/kii-alerts.component';
import { KiiAdminChatsComponent } from './_kiilib/_components/_pages/kii-admin-chats/kii-admin-chats.component';
import { KiiAdminStatsComponent } from './_kiilib/_components/_pages/kii-admin-stats/kii-admin-stats.component';
import { KiiAdminDiskComponent } from './_kiilib/_components/_pages/kii-admin-disk/kii-admin-disk.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },  
  {
    path: 'sidenav',
    component: KiiSidenavComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: KiiLoginSignupComponent,
    pathMatch: "full"
  },  
  {
    path: 'login/validate/:token',
    component: KiiLoginOauthComponent,
    data: { skipRouteLocalization: true }
  },
  {
    path: 'login/validate-email',
    component: KiiEmailValidateComponent,
    data: { skipRouteLocalization: true }
  },
  {
    path: 'reset-password',
    component: KiiResetPasswordComponent,
    pathMatch: "full"
  },
  {
    path: 'profile',
    component: KiiProfileComponent
  },  
  {
    path: 'alerts',
    component: KiiAlertsComponent,
    pathMatch: "full"
  },  

  {
    path: 'prices',
    component: PrixComponent,
    pathMatch: 'full'
  },  
  {
    path: 'clients',
    component: RealisationsComponent,
    pathMatch: 'full'
  }, 
  {
    path: 'blog',
    component: KiiBlogComponent,
    pathMatch: 'full'
  }, 
  {
    path: 'contact',
    component: KiiContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'articles/:id',
    component: KiiArticleDetailComponent,
    //data: { skipRouteLocalization: true }

  },   
  /*Admin part*/
  {
    path: 'admin-menu',
    component: KiiAdminMenuComponent,
  },  
  {
    path: 'admin-settings',
    component: KiiAdminSettingsComponent,
  },  
  {
    path: 'admin-users',
    component: KiiAdminUsersComponent,
  },  
  {
    path: 'admin-content',
    component: KiiAdminArticlesComponent,
  }, 
  {
    path: 'admin-emails',
    component: KiiAdminEmailsComponent,
  }, 
  {
    path: 'admin-chats',
    component: KiiAdminChatsComponent,
  }, 
  {
    path: 'admin-disk',
    component: KiiAdminDiskComponent,
  },
  {
    path: 'admin-stats',
    component: KiiAdminStatsComponent,
  }, 
  /*{path: '404', component: KiiNotFoundComponent, pathMatch: "full"},
  {path: '**', redirectTo: '/404', pathMatch: "full"}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
