import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard-page.component/dashboard-page.component')
        .then(m => m.DashboardPageComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
