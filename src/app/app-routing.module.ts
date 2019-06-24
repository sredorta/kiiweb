import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { KiiSidenavComponent } from './_kiilib/_components/kii-sidenav/kii-sidenav.component';
import { PrixComponent } from './pages/prix/prix.component';
import { RealisationsComponent } from './pages/realisations/realisations.component';

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
