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
          {
            path: 'company',
            data: { pageTitle: 'Empresa', breadcrumb: 'Empresa' },
            loadChildren: pages.hospitalRegistration,
          },
          {
            path: 'permission',
            data: { pageTitle: 'Permissão', breadcrumb: 'Permissão' },
            loadChildren: pages.permissionRegistration,
          },
          {
            path: 'item',
            data: { pageTitle: 'Item', breadcrumb: 'Item' },
            loadChildren: pages.itemRegistration,
          },
        ],
      },
      {
        path: 'registration',
        data: { pageTitle: 'Cadastro', breadcrumb: 'Cadastro' },
        children: [
          {
            path: 'disiase',
            data: { pageTitle: 'Doenças', breadcrumb: 'Doenças' },
            loadChildren: pages.disiaseRegistration,
          },
          {
            path: 'sector-settings',
            data: {
              pageTitle: 'Configuração Setor',
              breadcrumb: 'Configuração Setor',
            },
            loadChildren: pages.sectorSettingsRegistration,
          },
          {
            path: 'medical-procedure',
            data: {
              pageTitle: 'Procedimento Médico',
              breadcrumb: 'Procedimento Médico',
            },
            loadChildren: pages.medicalProcedureRegistration,
          },
          {
            path: 'patient',
            data: {
              pageTitle: 'Paciente',
              breadcrumb: 'Paciente',
            },
            loadChildren: pages.patientRegistration,
          },
          {
            path: 'doctor-appointment',
            data: {
              pageTitle: 'Consulta Médica',
              breadcrumb: 'Consulta Médica',
            },
            loadChildren: pages.doctorAppointmentRegistration,
          },
        ],
      },
    ],
  },
];
