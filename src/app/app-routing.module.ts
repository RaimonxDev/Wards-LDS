import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'home',
  },

  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./admin/modules/auth/components/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
    ],
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./admin/modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'minuta',
        loadChildren: () =>
          import('./admin/modules/minuta/minuta.module').then(
            (m) => m.MinutaModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
