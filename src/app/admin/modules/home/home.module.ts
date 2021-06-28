import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LayoutComponent } from '../../../core/layout/layout.component';

@NgModule({
  declarations: [HomeComponent, LayoutComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
