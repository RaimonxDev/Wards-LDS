import { Component } from '@angular/core';
import { AlertService } from './ui/alert/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'BarrioCentro';
  constructor(private alert: AlertService) {}
  openAlert() {
    this.alert.opendAlert(
      'titulos',
      'mensje',
      'info'
      // duration: 3000,
      // verticalPosition: 'top',
      // horizontalPosition: 'center',
    );
  }
}
