import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMinutaComponent } from './components/crear-minuta/crear-minuta.component';
import { MinutaComponent } from './minuta.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MinutaComponent,
        redirectTo: 'crear',
      },
      { path: 'crear', component: CrearMinutaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinutaRoutingModule {}
