import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinutaRoutingModule } from './minuta-routing.module';
import { MinutaComponent } from './minuta.component';
import { EssentialReactiveFormModule } from '../../../shared/modules/essential-reactive-form/essential-reactive-form.module';
import { CrearMinutaComponent } from './components/crear-minuta/crear-minuta.component';

@NgModule({
  declarations: [MinutaComponent, CrearMinutaComponent],
  imports: [CommonModule, MinutaRoutingModule, EssentialReactiveFormModule],
})
export class MinutaModule {}
