import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { combineLatest, merge } from 'rxjs';
import { debounceTime, mapTo, startWith } from 'rxjs/operators';
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
  activeButtonAddForm: boolean = false;

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
    this.formRepeatable = this._fb.group({
      nombre: ['', [Validators.minLength(5)]],
      tema: ['', [Validators.minLength(5)]],
      llamamiento: ['', [Validators.minLength(5)]],
    });
    // console.log(this.formRepeatable);
    // combineLatest([
    //   this.nombreControl.valueChanges,
    //   this.temaControl.valueChanges,
    //   this.llamamientoControl.valueChanges,
    // ])
    //   .pipe(startWith(''))
    //   .subscribe(([a, b, c]) => {
    //     console.log('nombre', a);
    //     console.log('tema', b);
    //     console.log('llama', c);
    //   });

    // merge(
    //   this.nombreControl.valueChanges.pipe(mapTo('nombre')),
    //   this.temaControl?.valueChanges,
    //   this.llamamientoControl?.valueChanges
    // ).subscribe((resp) => {
    //   this.activeButtonAddForm = false;
    //   if (resp === '') {
    //     this.activeButtonAddForm = false;
    //   } else {
    //     this.activeButtonAddForm = true;
    //   }
    // });

    // this.nombreControl.valueChanges.subscribe((event) => {
    //   if (event === '' || event === null) {
    //     this.activeButtonAddForm = false;
    //   } else {
    //     this.activeButtonAddForm = true;
    //   }
    // });
  }

  getErrorMessage(field: string) {
    return (
      this.formRepeatable.controls[field]?.errors &&
      this.formRepeatable.controls[field]?.touched
    );
  }

  addForm() {
    if (this.formRepeatable.valid) {
      this.data.emit({
        form: this.formRepeatable.value,
        type: this.controlName,
      });
      this.formRepeatable.reset();
    }
    // return this.formRepeatable.markAsTouched();
  }
}
