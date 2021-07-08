import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Minuta, tipoMinutas } from '../../models/minuta.models';
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
  minuta$!: Observable<Minuta>;
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
      tap((data) => console.log(data))
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
    console.log(this.editForm);
  }
}
