import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActionForm } from '../../models/minuta.models';
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
  tipoMinuta!: string[];
  formMinuta!: FormGroup;
  newDiscursante: FormControl = this._fb.control('');
  temaNewDiscursante: FormControl = this._fb.control('');

  get discursantesArr() {
    return this.formMinuta.get('discursantes') as FormArray;
  }

  constructor(private _fb: FormBuilder) {
    this.tipoMinuta = ['sacramental'];
  }
  ngOnInit(): void {
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

  initFormMinuta() {
    this.formMinuta = this._fb.group({
      tipoMinuta: ['', [Validators.required]],
      preside: ['Presiente Inzunza', [Validators.required]],
      dirige: ['Obispo Hernandez', [Validators.required]],
      fecha: ['', [Validators.required]],
      preludioMusica: ['Himno 1'],
      reconocimientos: ['reconocimientos 1'],
      anuncios: ['reconocimientos 2'],
      primerHimno: ['himno2'],
      primeraOracion: ['oracion'],
      relevos: ['relevo'],
      sostenimientos: ['sostenimientos'],
      himnoSacramental: ['himnos'],
      discursantes: this._fb.array([]),
      himnoFinal: ['himno himnoFinal'],
      oracionFinal: ['oracion final'],
    });
  }

  addDiscursantes() {
    const discursantesForm = this._fb.group({
      nombreDiscursante: [this.newDiscursante.value, [Validators.required]],
      temaDiscursante: [this.temaNewDiscursante.value, [Validators.required]],
    });
    this.discursantesArr.push(discursantesForm);
    this.newDiscursante.reset();
    this.temaNewDiscursante.reset();
  }

  addAnuncios() {
    return null;
  }
  addRelevos() {
    return null;
  }
  addSostenimientos() {
    return null;
  }

  guardarMinuta() {
    console.log(this.formMinuta.value);
  }
  eliminarDiscursante(index: number) {
    this.discursantesArr.removeAt(index);
  }
}
