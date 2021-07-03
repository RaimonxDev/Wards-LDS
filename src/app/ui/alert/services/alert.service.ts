import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../components/alert/alert.component';
import {
  dataAlert,
  TypeAlert,
  VerticalPosition,
  HorizontalPosition,
} from '../components/alert/model/alertModel';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  opendAlert(
    title: string,
    message: string,
    type: TypeAlert,
    duration: number = 2500,
    buttonText?: string,
    verticalPosition: VerticalPosition = 'top',
    horizontalPosition: HorizontalPosition = 'center'
  ) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: {
        title,
        message,
        buttonText,
        type,
      },
      verticalPosition,
      horizontalPosition,
      duration,
      panelClass: 'transparent',
    });
  }
}
