import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
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
import {
  repeatableFields,
  dataEmitRepetableForm,
} from '../../models/minuta.models';
import { OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mapTo, takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { subHours, formatISO } from 'date-fns';
import { setDateMinuta } from '../../utils/setHours';

@Component({
  selector: 'template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  providers: [DatePipe],
})
export class TemplateFormComponent implements OnInit, OnDestroy {
  @Input() ActionForm!: ActionForm;
  @Output() DataForm = new EventEmitter<any>();

  minuta$!: Observable<Minuta>;
  minuta!: Minuta;

  initialData: Minuta = {
    tipos_de_minuta: {},
    barrio: {},
    anuncios: '',
    preside: '',
    dirige: '',
    reconocimientos: '',
    fecha: new Date(),
    primera_oracion: '',
    primer_himno: '',
    preludio_musical: '',
    himno_sacramental: '',
    relevos: [],
    sostenimientos: [],
    discursantes: [],
    ultima_oracion: '',
    ultimo_himno: '',
    completa: false,
  };
  tipoMinuta$!: Observable<tipoMinutas[]>;

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

  get tiposDeMinuta() {
    return this.formMinuta.get('tipos_de_minuta');
  }

  get getFecha() {
    return this.formMinuta.get('fecha');
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

    this.tipoMinuta$ = this._minutaServices.tiposDeMinuta$;

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
    if (this.editForm) {
      this.formMinuta.patchValue(this.minuta);
      // seteamos el ID para el select
      this.tiposDeMinuta?.setValue(this.minuta.tipos_de_minuta.id);
      // Seteamos la fecha
      this.getFecha?.setValue(setDateMinuta(this.minuta.fecha));

      // Primero limpiamos los array de los antiguos valores para evitar duplicados en la vista
      this.clearArraysForm();
      // Seteamos los array
      this.pacthArrayValue(this.minuta.relevos, 'relevos');
      this.pacthArrayValue(this.minuta.sostenimientos, 'sostenimientos');
      this.pacthArrayValue(this.minuta.discursantes, 'discursantes');
    }
    if (!this.editForm) {
      this.formMinuta.reset();

      // limpiamos los valores del array
      this.clearArraysForm();
    }
  }
  createMinuta() {
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
  processData(data: dataEmitRepetableForm) {
    if (data.type === 'relevos') {
      const { nombre, details } = data.form;
      this.relevosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          details: [details, [Validators.required]],
        })
      );
    }
    if (data.type === 'sostenimientos') {
      const { nombre, details } = data.form;
      this.sostenimientosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          details: [details, [Validators.required]],
        })
      );
    }

    if (data.type === 'discursantes') {
      const { nombre, details } = data.form;
      this.discursantesArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          details: [details, [Validators.required]],
        })
      );
    }
  }

  pacthArrayValue(data: formControlRepeatable[], field: repeatableFields) {
    if (field === 'relevos') {
      data.forEach((value) => {
        this.relevosArr.push(
          this._fb.group({
            nombre: [value.nombre, [Validators.required]],
            details: [value.details, [Validators.required]],
          })
        );
      });
    }

    if (field === 'sostenimientos') {
      data.forEach((value) => {
        this.sostenimientosArr.push(
          this._fb.group({
            nombre: [value.nombre, [Validators.required]],
            details: [value.details, [Validators.required]],
          })
        );
      });
    }

    if (field === 'discursantes') {
      data.forEach((value) => {
        this.discursantesArr.push(
          this._fb.group({
            nombre: [value.nombre, [Validators.required]],
            details: [value.details, [Validators.required]],
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
