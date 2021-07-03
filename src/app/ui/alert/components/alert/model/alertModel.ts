export type TypeAlert = 'success' | 'warning' | 'info' | 'error';
export type VerticalPosition = 'top' | 'bottom';
export type HorizontalPosition = 'center' | 'left' | 'right' | 'bottom';

export interface dataAlert {
  message: string;
  titleMessage: string;
  typeAlert: TypeAlert;
  duration?: number;
  buttonText?: string;
  verticalPosition?: VerticalPosition;
  horizontalPosition?: HorizontalPosition;
}
