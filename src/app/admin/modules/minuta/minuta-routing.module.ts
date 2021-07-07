import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMinutaComponent } from './components/crear-minuta/crear-minuta.component';
import { MinutaComponent } from './minuta.component';
import { ListMinutaComponent } from './components/list-minuta/list-minuta.component';
import {
  tiposDeMinutaResolver,
  MinutasResolver,
} from './resolvers/minuta.resolver';
import { RepeteableFieldComponent } from './components/repeteable-field/repeteable-field.component';

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
    resolve: [MinutasResolver],
  },
  { path: 'test', component: RepeteableFieldComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinutaRoutingModule {}
