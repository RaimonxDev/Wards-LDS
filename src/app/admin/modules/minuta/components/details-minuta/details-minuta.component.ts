import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
  formControlRepeatable,
  Minuta,
  repeatableFields,
  tipoMinutas,
} from '../../models/minuta.models';
import { MinutaService } from '../../services/minuta.service';
import { tap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/ui/alert/services/alert.service';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-details-minuta',
  templateUrl: './details-minuta.component.html',
  styleUrls: ['./details-minuta.component.scss'],
})
export class DetailsMinutaComponent implements OnInit {
  @Output() DataForm = new EventEmitter<any>();

  minuta$!: Observable<Minuta>;
  currentMinuta!: Minuta;
  tipoMinuta!: Observable<tipoMinutas[]>;

  formMinuta!: FormGroup;

  editForm: boolean = false;

  // Getters and Setters
  get discursantesArr() {
    return this.formMinuta.get('discursantes') as FormArray;
  }
  get relevosArr() {
    return this.formMinuta.get('relevos') as FormArray;
  }
  get sostenimientosArr() {
    return this.formMinuta.get('sostenimientos') as FormArray;
  }
  constructor(
    private _minutaServices: MinutaService,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initFormMinuta();

    this.minuta$ = this._minutaServices.minuta$.pipe(
      tap((minuta) => (this.currentMinuta = minuta))
    );
  }

  initFormMinuta() {
    this.formMinuta = this._fb.group({
      tipos_de_minuta: ['', [Validators.required]],
      completa: [false],
      barrio: [this._authService.barrioID],
      preside: ['', [Validators.required]],
      dirige: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      preludioMusica: [''],
      reconocimientos: [''],
      anuncios: [''],
      primer_himno: [''],
      primera_oracion: [''],
      relevos: this._fb.array([]),
      sostenimientos: this._fb.array([]),
      himno_sacramental: [''],
      discursantes: this._fb.array([]),
      ultimo_himno: [''],
      ultima_oracion: [''],
    });
  }

  editMode() {
    this.editForm = !this.editForm;
    // console.log(this.editForm);
    if (this.editForm) {
      this.formMinuta.patchValue(this.currentMinuta);
      // Seteamos los array
      this.pacthArrayValue(this.currentMinuta.relevos, 'relevos');
      this.pacthArrayValue(this.currentMinuta.sostenimientos, 'sostenimientos');
      this.pacthArrayValue(this.currentMinuta.discursantes, 'discursantes');
    }
    if (!this.editForm) {
      this.formMinuta.reset();

      // limpiamos los valores
      this.discursantesArr.clear();
      this.relevosArr.clear();
      this.discursantesArr.clear();
    }
  }

  updateMinuta() {
    console.log('update');
    console.log(this.formMinuta.value);
  }
  cancelEditionForm() {
    this.editForm = false;
    this.sostenimientosArr.clear();
    this.relevosArr.clear();
    this.discursantesArr.clear();
  }

  processData(data: { form: formControlRepeatable; type: repeatableFields }) {
    console.log(data);

    if (data.type === 'relevos') {
      const { nombre, llamamiento } = data.form;
      this.relevosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          llamamiento: [llamamiento, [Validators.required]],
        })
      );
    }
    if (data.type === 'sostenimientos') {
      const { nombre, llamamiento } = data.form;
      this.sostenimientosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          llamamiento: [llamamiento, [Validators.required]],
        })
      );
    }

    if (data.type === 'discursantes') {
      const { nombre, tema } = data.form;
      this.discursantesArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          tema: [tema, [Validators.required]],
        })
      );
    }
  }

  pacthArrayValue(data: any[], field: repeatableFields) {
    if (field === 'relevos') {
      data.forEach((value) => {
        this.relevosArr.push(
          this._fb.group({
            nombre: [value.nombre, [Validators.required]],
            llamamiento: [value.llamamiento, [Validators.required]],
          })
        );
      });
    }

    if (field === 'sostenimientos') {
      data.forEach((value) => {
        this.sostenimientosArr.push(
          this._fb.group({
            nombre: [value.nombre, [Validators.required]],
            llamamiento: [value.llamamiento, [Validators.required]],
          })
        );
      });
    }

    if (field === 'discursantes') {
      data.forEach((value) => {
        this.discursantesArr.push(
          this._fb.group({
            nombre: [value.nombre, [Validators.required]],
            tema: [value.tema, [Validators.required]],
          })
        );
      });
    }
  }

  eliminarDiscursante(index: number) {
    this.discursantesArr.removeAt(index);
  }
  eliminarRelevo(index: number) {
    this.relevosArr.removeAt(index);
  }
  eliminarSostenimiento(index: number) {
    this.sostenimientosArr.removeAt(index);
  }
}
