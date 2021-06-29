import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../components/alert/alert.component';
import { dataAlert } from '../components/alert/model/alertModel';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  opendAlert(params: dataAlert) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: {
        titleMessage: params.titleMessage,
        mesagge: params.message,
        buttonText: params.buttonText,
        typeAlert: params.typeAlert,
      },
      verticalPosition: (params.verticalPosition = 'top'),
      horizontalPosition: (params.horizontalPosition = 'center'),
      duration: params.duration,
      panelClass: 'transparent',
    });
  }
}
