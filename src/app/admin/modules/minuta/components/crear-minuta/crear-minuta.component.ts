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
  newDiscursante: FormControl = this._fb.control('');

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

  agregarDiscursante() {
    this.discursantesArr.controls.push(
      this._fb.control(this.newDiscursante.value, Validators.required)
    );
    this.newDiscursante.reset();
  }
}
