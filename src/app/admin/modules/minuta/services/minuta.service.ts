import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Minuta, tipoMinutas } from '../models/minuta.models';
import { AlertService } from '../../../../ui/alert/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class MinutaService {
  siteUrl = environment.siteUrl;

  private _minutas!: BehaviorSubject<Minuta[]>;
  private _minuta!: BehaviorSubject<Minuta>;
  private _tiposDeMinuta!: BehaviorSubject<tipoMinutas[]>;

  // Getters and Setters
  // @ts-ignore
  public get minutas$(): Observable<Minuta[]> {
    return this._minutas.asObservable();
  }
  public get minuta$(): Observable<Minuta> {
    return this._minuta.asObservable();
  }
  public get tiposDeMinuta$(): Observable<any> {
    return this._tiposDeMinuta.asObservable();
  }

  // private set minutas$(value: []) {
  //   this._minutas.next(value);
  // }

  // @ts-ignore

  // private set minuta$(value: []) {
  //   this._minutas.next(value);
  // }

  constructor(private _http: HttpClient, private _alert: AlertService) {
    // Sets Behavior
    this._minutas = new BehaviorSubject<Minuta[]>([]);
    //@ts-ignore
    this._minuta = new BehaviorSubject<Minuta>(null);
    this._tiposDeMinuta = new BehaviorSubject<tipoMinutas[]>([]);
  }

  // PETICIONES GET
  public getMinutas() {
    return this._http
      .get<Minuta[]>(`${this.siteUrl}/minutas`, {
        params: {
          _sort: 'fecha:DESC',
        },
      })
      .pipe(tap((minutas) => this._minutas.next(minutas)));
  }

  public getMinuta(id: string | null) {
    return this._http
      .get<Minuta>(`${this.siteUrl}/minutas/${id}`)
      .pipe(tap((resp) => this._minuta.next(resp)));
  }

  // Obtiene los tipos de minutas
  getTiposDeMinutas() {
    return this._http
      .get<tipoMinutas[]>(`${this.siteUrl}/tipos-de-minutas`)
      .pipe(tap((tiposDeMinuta) => this._tiposDeMinuta.next(tiposDeMinuta)));
  }

  // CRUD
  createMinuta(body: any) {
    return this._http.post(`${this.siteUrl}/minutas`, body).pipe(
      catchError((error) => {
        this._alert.opendAlert('UPS', 'No se pudo crear', 'error');
        return throwError('No se pudo crear la minuta');
      })
    );
  }

  updateMinuta(id: string | undefined, body: any): Observable<Minuta> {
    if (id === undefined) {
      return throwError('ID NO VALIDO');
    }

    return this._http.put<Minuta>(`${this.siteUrl}/minutas/${id}`, body).pipe(
      tap(() =>
        this._alert.opendAlert('Actualizado', 'Operacion Exitosa', 'success')
      ),
      catchError((error) => {
        this._alert.opendAlert('UPS', 'Algo ha fallado', 'error');
        return throwError('No se pudo actualizar');
      })
    );
  }

  deleteMinuta(id: string) {
    return this._http.delete(`${this.siteUrl}/minutas/${id}`).pipe(
      catchError((error) => {
        this._alert.opendAlert(
          'Error al eliminar',
          'Minuta no existe',
          'error',
          6000
        );
        return throwError('No se pudo eliminar la minuta');
      })
    );
  }
}
