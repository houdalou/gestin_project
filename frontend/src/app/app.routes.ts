import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

// Guards
import { authGuard } from './core/guards/auth-guard';

// Layout
import { Dashboard as LayoutDashboard } from './layout/dashboard/dashboard';

// Dashboard home
import { Dashboard as FeatureDashboard } from './features/dashboard/dashboard';

// Affiliation
import { NewAffiliation } from './features/affiliation/new-affiliation/new-affiliation';
import { AffiliationDetail } from './features/affiliation/affiliation-detail/affiliation-detail';

// Pages
import { SuiviModification } from './features/affiliation/suivi-modification/suivi-modification';
import { Consultation } from './features/affiliation/consultation/consultation';
import { Assistance } from './features/assistance/assistance';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'dashboard',
    component: LayoutDashboard,
    canActivate: [authGuard],

    children: [

      {
        path: '',
        component: FeatureDashboard
      },

      {
        path: 'nouvelle-affiliation',
        component: NewAffiliation
      },

      {
        path: 'suivi',
        component: SuiviModification
      },

      {
        path: 'affiliations/:id',
        component: AffiliationDetail
      },

      {
        path: 'consultation',
        component: Consultation
      },

      {
        path: 'assistance',
        component: Assistance
      }

    ]

  },

  {
    path: '**',
    redirectTo: 'login'
  }

];