import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth-guard.guard';
import { LayoutComponent } from './layout/layout.component';
import { NoAuthGuard } from './core/auth/guards/no-guard.guard';

const routes: Routes = [
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'dashboards/finance',
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
<<<<<<< HEAD
    redirectTo: 'login',
=======
    redirectTo: '/login',
    pathMatch: 'full',
>>>>>>> deb7080042cefeb7f90986476bca7760345115d0
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
