import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMinutaComponent } from './components/crear-minuta/crear-minuta.component';
import { MinutaComponent } from './minuta.component';
import { ListMinutaComponent } from './components/list-minuta/list-minuta.component';
import {
  tiposDeMinutaResolver,
  MinutasResolver,
  MinutaResolver,
} from './resolvers/minuta.resolver';
import { RepeteableFieldComponent } from './components/repeteable-field/repeteable-field.component';
import { DetailsMinutaComponent } from './components/details-minuta/details-minuta.component';

const routes: Routes = [
  {
    path: '',
    component: MinutaComponent,
  },
  {
    path: 'crear',
    component: CrearMinutaComponent,
    resolve: [tiposDeMinutaResolver],
  },
  {
    path: 'listado',
    component: ListMinutaComponent,
    resolve: [MinutasResolver, tiposDeMinutaResolver],
  },
  {
    path: 'details/:id',
    component: DetailsMinutaComponent,
    resolve: [MinutaResolver, tiposDeMinutaResolver],
  },
  { path: 'test', component: RepeteableFieldComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinutaRoutingModule {}
