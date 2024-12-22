import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddbookPageComponent } from './component/addbook-page/addbook-page.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'addbook', component: AddbookPageComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
