import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatButtonComponent } from './float-button.component';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [FloatButtonComponent, ActionsComponent],
  imports: [CommonModule],
  exports: [FloatButtonComponent],
})
export class FloatButtonModule {}
