import { Routes } from '@angular/router';
import * as pages from './pages';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    data: { pageTitle: 'Login' },
    loadChildren: pages.loginRegistration,
  },

];