import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KiiSidenavComponent } from './_kiilib/_components/kii-sidenav/kii-sidenav.component';
import { PrixComponent } from './pages/prix/prix.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';
import { KiiLoginSignupComponent } from './_kiilib/_components/_pages/kii-login-signup/kii-login-signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    path: 'login-not-translated',
    redirectTo: 'login',
    pathMatch: 'full',
    data: { skipRouteLocalization: true }
  },
  {
    path: 'login',
    component: KiiLoginSignupComponent,
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
