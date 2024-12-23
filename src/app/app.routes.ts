import { Routes } from '@angular/router';
import { HomeComponent } from './component/home-component/home.component';
import { AddbookPageComponent } from './component/addbook-page/addbook-page.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { EditbookPageComponent } from './component/editbook-page/editbook-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-book', component: AddbookPageComponent },
  { path: 'edit-book/:id', component: EditbookPageComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
