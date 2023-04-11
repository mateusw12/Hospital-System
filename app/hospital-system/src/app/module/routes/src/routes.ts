import { Routes } from '@angular/router';
import { MenuComponent } from '@module/pages/menu';
import { AuthGuardsService } from '@module/utils/http';
import * as pages from './pages';

export const routes: Routes = [
  {
    path: 'login',
    data: { pageTitle: 'Login' },
    loadChildren: pages.loginRegistration,
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: { pageTitle: 'Menu', breadcrumb: 'Menu' },
    canActivate: [AuthGuardsService],
    canActivateChild: [AuthGuardsService],
    children: [
      {
        path: 'information',
        data: { pageTitle: 'Informações', breadcrumb: 'Informações' },
        loadChildren: pages.information,
      },
      {
        path: 'administration',
        data: { pageTitle: 'Administração', breadcrumb: 'Administração' },
        children: [
          {
            path: 'user',
            data: { pageTitle: 'Usuário', breadcrumb: 'Usuário' },
            loadChildren: pages.userRegistration,
          },
        ],
      },
    ],
  },
];