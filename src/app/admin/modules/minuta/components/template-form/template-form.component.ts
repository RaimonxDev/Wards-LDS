import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ActionForm,
  tipoMinutas,
  formControlRepeatable,
  Minuta,
} from '../../models/minuta.models';
import { MinutaService } from '../../services/minuta.service';
import { AlertService } from '../../../../../ui/alert/services/alert.service';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';
import { repeatableFields } from '../../models/minuta.models';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit, AfterViewInit {
  // Outpus Inputs
  @Input() ActionForm!: ActionForm;

  @Output() DataForm = new EventEmitter<any>();

  // Variables
  tipoMinuta!: Observable<tipoMinutas[]>;
  formMinuta!: FormGroup;
  // Para el modo de editar obtenemos la minuta actual y crearemos el form
  minuta$!: Observable<Minuta>;

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

  getAnyField(field: string) {
    return this.formMinuta.get(`${field}`);
  }

  constructor(
    private _fb: FormBuilder,
    private _minutaServices: MinutaService,
    private _alert: AlertService,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    this.tipoMinuta = this._minutaServices.tiposDeMinuta$;

    this.initFormMinuta();
    if (this.ActionForm === 'crear') {
      this.formMinuta.reset();
    }
    if (this.ActionForm === 'editar') {
      // Data a editar
      this._minutaServices.minuta$.subscribe((data) => {
        this.formMinuta.patchValue(data);

        // Seteamos los array
        this.pacthArrayValue(data.relevos, 'relevos');
        this.pacthArrayValue(data.sostenimientos, 'sostenimientos');
        this.pacthArrayValue(data.discursantes, 'discursantes');
      });
    }
  }
  ngAfterViewInit() {}

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
      console.log(data.form, data.type);
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

  addAnuncios() {
    return null;
  }

  guardarMinuta() {
    // Comprobrar si todos los campos requeridos en la minuta estan completos
    if (
      this.discursantesArr.length !== 0 &&
      this.relevosArr.length !== 0 &&
      this.sostenimientosArr.length !== 0
    ) {
      this.formMinuta.controls['completa'].setValue(true);
    }
    this._minutaServices
      .createMinuta(this.formMinuta.value)
      .subscribe((resp) => {
        console.log(resp);
        this._alert.opendAlert('Creado', '', 'success');
      });
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
