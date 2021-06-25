import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-crear-minuta',
  templateUrl: './crear-minuta.component.html',
  styleUrls: ['./crear-minuta.component.scss'],
})
export class CrearMinutaComponent implements OnInit {
  //@ts-ignore
  formMinuta: FormGroup;
  // formDiscursantes!: FormGroup;
  newDiscursante: FormControl = this._fb.control('');
  temaNewDiscursante: FormControl = this._fb.control('');

  get discursantesArr() {
    return this.formMinuta.get('discursantes') as FormArray;
  }

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.initFormMinuta();
  }
  initFormMinuta() {
    this.formMinuta = this._fb.group({
      preside: [''],
      dirige: [''],
      fecha: [''],
      preludioMusica: [''],
      reconocimientos: [''],
      anuncios: [''],
      primerHimno: [''],
      primeraOracion: [''],
      relevos: [''],
      sostenimientos: [''],
      himnoSacramental: [''],
      discursantes: this._fb.array([], [Validators.required]),
      segundoDiscursante: [''],
      tercerDiscursante: [''],
      cuartoDiscursante: [''],
      himnoFinal: [''],
      oracionFinal: [''],
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

  guardarMinuta() {
    console.log(this.formMinuta.value);
  }
  eliminarDiscursante(index: number) {
    this.discursantesArr.removeAt(index);
  }
}
