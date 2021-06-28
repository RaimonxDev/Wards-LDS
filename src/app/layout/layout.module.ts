import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutComponent } from './layout.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [CommonModule, MatSidenavModule, AppRoutingModule],
  exports: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
})
export class LayoutModule {}
