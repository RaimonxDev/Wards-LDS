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
import { addOneDay, MY_DATE_FORMATS } from '../../utils/setDates';
import { UserService } from '../../../../../core/user/services/user.service';
import { UserInfo } from '../../../../../core/models/user.models';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../../../../../ui/dialog/components/dialog-content/dialog-content.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
  providers: [
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class TemplateFormComponent implements OnInit, OnDestroy {
  @Input() ActionForm!: ActionForm;
  @Output() DataForm = new EventEmitter<any>();

  minuta$!: Observable<Minuta>;
  minuta!: Minuta;

  user!: UserInfo;

  initialData: Minuta = {
    id: '',
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
    creada_por: '',
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
  get getcreadaPor() {
    return this.formMinuta.get('creada_por');
  }

  constructor(
    private _minutaServices: MinutaService,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
    private _acRouter: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initFormMinuta();

    this.tipoMinuta$ = this._minutaServices.tiposDeMinuta$;
    this._userService.user$.subscribe((user) => (this.user = user));

    // this.ActionForm = 'editar';
    if (this.ActionForm === 'crear') {
      this.editForm = true;
      this._minutaServices.minuta$
        .pipe(mapTo(this.initialData), takeUntil(this._unsubscribeAll))
        .subscribe((minuta) => {
          this.minuta = minuta;
          // Seteamos el usuaro que esta creando la minuta
          this.getcreadaPor?.setValue(this.user.username);
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
      hora: ['', [Validators.required]],
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
      creada_por: [''],
    });
  }

  editMode() {
    this.editForm = !this.editForm;
    if (this.editForm) {
      this.formMinuta.patchValue(this.minuta);
      // seteamos el ID para el select
      this.tiposDeMinuta?.setValue(this.minuta.tipos_de_minuta.id);
      // Seteamos la fecha
      this.getFecha?.setValue(addOneDay(this.minuta.fecha));
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
          'Minuta creada',
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

  deleteMinuta(id: string) {
    this._minutaServices.deleteMinuta(id.toString()).subscribe((resp) => {
      console.log(resp);
      this._alert.opendAlert(
        'Minuta Eliminada',
        'Sastifactoriamente',
        'warning'
      );
      this._router.navigate(['minuta/listado']);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: {
        title: 'Seguro que desea eliminar esta Minuta',
        message: 'Tenga en cuenta que esta accion es irreversible',
        buttonAccept: 'Eliminar Minuta',
        buttonDecline: 'Cancelar',
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe((result) => {
      if (result === false || undefined) {
        return;
      }
      if (result) {
        this.deleteMinuta(this.minuta.id);
      }
    });
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
  backToList(url?: string) {
    const route = this._acRouter;

    console.log(route);
    // Go to the parent route
    this._router.navigate(['../'], { relativeTo: route });
  }
  processData(data: dataEmitRepetableForm) {
    if (data.type === 'relevos') {
      const { nombre, detalles } = data.form;
      this.relevosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          detalles: [detalles, [Validators.required]],
        })
      );
    }
    if (data.type === 'sostenimientos') {
      const { nombre, detalles } = data.form;
      this.sostenimientosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          detalles: [detalles, [Validators.required]],
        })
      );
    }

    if (data.type === 'discursantes') {
      const { nombre, detalles } = data.form;
      this.discursantesArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          detalles: [detalles, [Validators.required]],
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
            detalles: [value.detalles, [Validators.required]],
          })
        );
      });
    }

    if (field === 'sostenimientos') {
      data.forEach((value) => {
        this.sostenimientosArr.push(
          this._fb.group({
            nombre: [value.nombre, [Validators.required]],
            detalles: [value.detalles, [Validators.required]],
          })
        );
      });
    }

    if (field === 'discursantes') {
      data.forEach((value) => {
        this.discursantesArr.push(
          this._fb.group({
            nombre: [value.nombre, [Validators.required]],
            detalles: [value.detalles, [Validators.required]],
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
