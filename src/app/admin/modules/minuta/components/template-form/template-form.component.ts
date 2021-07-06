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
  Discursante,
} from '../../models/minuta.models';
import { MinutaService } from '../../services/minuta.service';
import { AlertService } from '../../../../../ui/alert/services/alert.service';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  // Controles de Discursante
  newDiscursante: FormControl = this._fb.control('', [Validators.required]);
  temaNewDiscursante: FormControl = this._fb.control('', [Validators.required]);

  // Controles Relevos

  relevo: FormControl = this._fb.control('', [Validators.required]);
  relevoDeLlamamiento: FormControl = this._fb.control('', [
    Validators.required,
  ]);

  // Controles Sostenimientos
  sostenimientos: FormControl = this._fb.control('', [Validators.required]);
  llamamientoDeSostenimiento: FormControl = this._fb.control('', [
    Validators.required,
  ]);

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
      // Formulario Vacio
      // this.formMinuta.patchValue({});
    }
    if (this.ActionForm === 'editar') {
      // Data a editar
      // this.formMinuta.patchValue({})
    }
  }
  ngAfterViewInit() {}

  getErrorMessage(field: string) {
    if (`this.${field}.hasError('required')`) {
      return 'Campo requerido';
    }
    return;
  }
  initFormMinuta() {
    this.formMinuta = this._fb.group({
      tipos_de_minuta: ['', [Validators.required]],
      barrio: [this._authService.barrioID],
      preside: ['Presiente Inzunza', [Validators.required]],
      dirige: ['Obispo Hernandez', [Validators.required]],
      fecha: ['', [Validators.required]],
      preludioMusica: ['Himno 1'],
      reconocimientos: ['reconocimientos 1'],
      anuncios: ['reconocimientos 2'],
      primer_himno: ['himno2'],
      primera_oracion: ['oracion'],
      relevos: this._fb.array([]),
      sostenimientos: this._fb.array([]),
      himno_sacramental: ['himnos'],
      discursantes: this._fb.array([]),
      ultimo_himno: ['himno himnoFinal'],
      ultima_oracion: ['oracion final'],
    });
  }

  processData(data: { form: any; type: string }) {
    if (data.type === 'relevos') {
      this.relevosArr.push(this._fb.group(data.form));
    }
    if (data.type === 'sostenimientos') {
      this.sostenimientosArr.push(this._fb.group(data.form));
    }

    if (data.type === 'discursantes') {
      this.discursantesArr.push(this._fb.group(data.form));
    }

    console.log(data.form);
    // this.addRelevos(data);
    // this.relevosArr.push(this._fb.group(data));
  }
  addDiscursantes() {
    const discursantesForm = this._fb.group({
      nombre: [this.newDiscursante.value, [Validators.required]],
      tema: [this.temaNewDiscursante.value, [Validators.required]],
    });
    this.discursantesArr.push(discursantesForm);
    this.newDiscursante.reset();
    this.temaNewDiscursante.reset();
  }

  addAnuncios() {
    return null;
  }
  addRelevos(d: any) {
    return this.relevosArr.push(d);
  }
  addSostenimientos() {
    const sostenimientos = this._fb.group({
      nombre: [this.sostenimientos.value, [Validators.required]],
      llamamiento: [
        this.llamamientoDeSostenimiento.value,
        [Validators.required],
      ],
    });
    this.sostenimientosArr.push(sostenimientos);
    this.sostenimientos.reset();
    this.llamamientoDeSostenimiento.reset();
  }

  guardarMinuta() {
    console.log(this.formMinuta.value);
    console.log('template');
    return;
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
