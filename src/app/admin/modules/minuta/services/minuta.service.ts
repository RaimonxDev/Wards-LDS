import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Minuta, tipoMinutas } from '../models/minuta.models';

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
  public get minutas$(): Observable<any[]> {
    return this._minutas.asObservable();
  }
  public get minuta$(): Observable<any> {
    return this._minutas.asObservable();
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

  constructor(private _http: HttpClient) {
    // Sets Behavior
    this._minutas = new BehaviorSubject<Minuta[]>([]);
    //@ts-ignore
    this._minuta = new BehaviorSubject<Minuta>(null);
    this._tiposDeMinuta = new BehaviorSubject<tipoMinutas[]>([]);
  }

  // PETICIONES GET
  getMinutas() {
    return this._http
      .get<Minuta[]>(`${this.siteUrl}/minutas`)
      .pipe(tap((minutas) => this._minutas.next(minutas)));
  }
  getMinta(id: string) {
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
    return this._http.post(`${this.siteUrl}/minutas`, body);
  }

  updateData(id: string, body: any) {
    return this._http.post(`${this.siteUrl}/minutas/${id}`, body);
  }

  deleteData() {}
}
