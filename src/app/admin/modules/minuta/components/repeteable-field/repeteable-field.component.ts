import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  repeatableFields,
  dataEmitRepetableForm,
} from '../../models/minuta.models';

@Component({
  selector: 'app-repeteable-field',
  templateUrl: './repeteable-field.component.html',
  styleUrls: ['./repeteable-field.component.scss'],
})
export class RepeteableFieldComponent implements OnInit {
  @Input() controlName!: repeatableFields;

  @Output() data: EventEmitter<dataEmitRepetableForm> =
    new EventEmitter<dataEmitRepetableForm>();

  formRepeatable!: FormGroup;
  activeButtonAddForm: boolean = false;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.formRepeatable = this._fb.group({
      nombre: ['', [Validators.minLength(5)]],
      detalles: ['', [Validators.minLength(5)]],
    });
  }

  addForm() {
    this.data.emit({
      form: this.formRepeatable.value,
      type: this.controlName,
    });
  }
}
