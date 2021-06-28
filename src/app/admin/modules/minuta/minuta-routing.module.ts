import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMinutaComponent } from './components/crear-minuta/crear-minuta.component';
import { MinutaComponent } from './minuta.component';
import { ListMinutaComponent } from './components/list-minuta/list-minuta.component';

const routes: Routes = [
  {
    path: '',
    component: MinutaComponent,
  },
  { path: 'crear', component: CrearMinutaComponent },
  { path: 'listado', component: ListMinutaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinutaRoutingModule {}
