import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { AlertModule } from './ui/alert/alert.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorsTokenService } from './core/interceptors/token.service';
import { DateFnsModule } from 'ngx-date-fns';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    CoreModule,
    LayoutModule,
    NgProgressModule,
    NgProgressHttpModule,
    AlertModule,
    DateFnsModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsTokenService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
