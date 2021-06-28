import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
