import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ActionForm,
  tipoMinutas,
  formControlRepeatable,
  Minuta,
} from '../../models/minuta.models';
import { MinutaService } from '../../services/minuta.service';
import { AlertService } from '../../../../../ui/alert/services/alert.service';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { repeatableFields } from '../../models/minuta.models';
import { OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mapTo, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit, OnDestroy {
  @Input() ActionForm!: ActionForm;
  @Output() DataForm = new EventEmitter<any>();

  minuta$!: Observable<Minuta>;
  minuta!: Minuta;

  initialData: Minuta = {
    anuncios: '',
    ultima_oracion: '',
    ultimo_himno: '',
    himno_sacramental: '',
    primera_oracion: '',
    primer_himno: '',
    preludio_musical: '',
    fecha: new Date(),
    dirige: '',
    preside: 'Ramon',
    reconocimientos: '',
    discursantes: [],
    relevos: [],
    sostenimientos: [],
    barrio: {},
    tipos_de_minuta: {},
    completa: false,
  };
  tipoMinuta!: Observable<tipoMinutas[]>;

  formMinuta!: FormGroup;

  editForm: boolean = false;

  // Getters and Setters

  private _unsubscribeAll: Subject<any> = new Subject<any>();

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
    private _authService: AuthService,
    private _router: Router,
    private _acRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initFormMinuta();

    this.tipoMinuta = this._minutaServices.tiposDeMinuta$;

    // this.ActionForm = 'editar';
    if (this.ActionForm === 'crear') {
      this.editForm = true;
      this._minutaServices.minuta$
        .pipe(mapTo(this.initialData), takeUntil(this._unsubscribeAll))
        .subscribe((minuta) => {
          this.minuta = minuta;
        });
    }

    if (this.ActionForm === 'editar') {
      this._minutaServices.minuta$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((minuta) => {
          this.minuta = minuta;
        });
    }
    console.log(this.ActionForm);
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
    console.log(this.formMinuta.pristine);
    if (this.editForm) {
      this.formMinuta.patchValue(this.minuta);
      // Primero limpiamos los array de los antiguos valores para evitar duplicados en la vista
      this.clearArraysForm();
      // Seteamos los array
      this.pacthArrayValue(this.minuta.relevos, 'relevos');
      this.pacthArrayValue(this.minuta.sostenimientos, 'sostenimientos');
      this.pacthArrayValue(this.minuta.discursantes, 'discursantes');
    }
    if (!this.editForm) {
      this.formMinuta.reset();

      // limpiamos los valores
      this.clearArraysForm();
    }
  }
  createMinuta() {
    console.log(this.formMinuta.value);
    this.formMinuta.disable();

    this._minutaServices.createMinuta(this.formMinuta.value).subscribe(
      (resp) => {
        console.log(resp);
        this.formMinuta.enable();
        this.formMinuta.reset();
        this.clearArraysForm();
        this._alert.opendAlert(
          'Creado',
          'Se creo correctamente la minuta',
          'success'
        );
      },
      (error) => {
        this.formMinuta.enable();
      }
    );
  }
  updateMinuta() {
    const body = this.formMinuta.value;
    this.formMinuta.disable();

    return this._minutaServices.updateMinuta(this.minuta.id, body).subscribe(
      (resp) => {
        this.formMinuta.enable();
        this.editForm = false;
        this.minuta = resp;
      },
      (error) => {
        this.formMinuta.enable();
      }
    );
  }

  cancelEditionForm() {
    this.editForm = false;
    this.clearArraysForm();
  }

  clearArraysForm() {
    this.sostenimientosArr.clear();
    this.relevosArr.clear();
    this.discursantesArr.clear();
  }

  // ultils
  backToList() {
    const route = this._acRouter;
    // Go to the parent route
    this._router.navigate(['../'], { relativeTo: route });
  }
  processData(data: { form: formControlRepeatable; type: repeatableFields }) {
    if (data.type === 'relevos') {
      const { nombre, details } = data.form;
      this.relevosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          llamamiento: [details, [Validators.required]],
        })
      );
    }
    if (data.type === 'sostenimientos') {
      const { nombre, details } = data.form;
      this.sostenimientosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          llamamiento: [details, [Validators.required]],
        })
      );
    }

    if (data.type === 'discursantes') {
      const { nombre, details } = data.form;
      this.discursantesArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          tema: [details, [Validators.required]],
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
  notEditing() {
    if (this.ActionForm === 'editar' && this.editForm === false) {
      return true;
    }
    if (this.ActionForm === 'crear' && this.editForm === true) {
      return false;
    }
    return false;
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

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
