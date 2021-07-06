import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { repeatableFields } from '../../models/minuta.models';

@Component({
  selector: 'app-repeteable-field',
  templateUrl: './repeteable-field.component.html',
  styleUrls: ['./repeteable-field.component.scss'],
})
export class RepeteableFieldComponent implements OnInit {
  @Input() controlName!: repeatableFields;

  @Output() data: EventEmitter<{ form: any; type: repeatableFields }> =
    new EventEmitter<{ form: any; type: repeatableFields }>();

  formRepeatable!: FormGroup;

  // Getters and Setters

  get nombreControl() {
    return this.formRepeatable.controls['nombre'];
  }
  get temaControl() {
    return this.formRepeatable.controls['tema'];
  }
  get llamamientoControl() {
    return this.formRepeatable.controls['llamamiento'];
  }

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    // fix error. No entra el if
    if (this.controlName === 'discursantes') {
      this.formRepeatable = this._fb.group({
        nombre: ['', Validators.required],
        tema: ['', Validators.required],
      });
    }

    this.formRepeatable = this._fb.group({
      nombre: ['', Validators.required],
      llamamiento: ['', Validators.required],
    });
  }

  getErrorMessage(field: string) {
    return (
      this.formRepeatable.controls[field].hasError('required') &&
      this.formRepeatable.controls[field].touched
    );
  }

  addForm() {
    this.data.emit({
      form: this.formRepeatable.value,
      type: `${this.controlName}`,
    });
  }
}
