import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-repeteable-field',
  templateUrl: './repeteable-field.component.html',
  styleUrls: ['./repeteable-field.component.scss'],
})
export class RepeteableFieldComponent implements OnInit {
  @Input() field: any;
  @Input() firtsField: any;
  @Input() SecondField: any;
  @Input() controlName: any;

  @Output() data: EventEmitter<any> = new EventEmitter<any>();

  formRepeteable!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    // fix error. No entra el if
    if (this.controlName === 'discursantes') {
      this.formRepeteable = this._fb.group({
        nombre: ['', Validators.required],
        tema: ['', Validators.required],
      });
    }

    this.formRepeteable = this._fb.group({
      nombre: ['', Validators.required],
      llamamiento: ['', Validators.required],
    });
  }

  getErrorMessage(field: string) {
    if (`this.${field}.hasError('required')`) {
      return 'Campo requerido';
    }
    return;
  }

  addForm() {
    this.data.emit({
      form: this.formRepeteable.value,
      type: `${this.controlName}`,
    });
    // console.log(this.formRepeteable.value);
  }
}
