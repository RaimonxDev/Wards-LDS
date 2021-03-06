import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth-guard.guard';
import { LayoutComponent } from './layout/layout.component';
import { NoAuthGuard } from './core/auth/guards/no-guard.guard';

const routes: Routes = [
  // Ruta principal
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    loadChildren: () =>
      import('./auth/components/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
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
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
