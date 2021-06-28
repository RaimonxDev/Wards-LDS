import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MinutaService {
  siteUrl = environment.siteUrl;

  private _minutas!: BehaviorSubject<any[]>;
  private _minuta!: BehaviorSubject<any>;

  // Getters and Setters
  // @ts-ignore
  private get minutas$(): Observable<any[]> {
    return this._minutas.asObservable();
  }

  private set minutas$(value: []) {
    this._minutas.next(value);
  }

  // @ts-ignore
  private get minuta$(): Observable<any> {
    return this._minutas.asObservable();
  }

  private set minuta$(value: []) {
    this._minutas.next(value);
  }

  constructor(private _http: HttpClient) {
    // Sets Behavior

    this._minutas = new BehaviorSubject<any[]>([]);
    this._minuta = new BehaviorSubject<any[]>([]);
  }

  getMinutas() {
    return this._http.get(`${this.siteUrl}/minutas`);
  }
  getMinta(id: string) {
    return this._http.get(`${this.siteUrl}/minutas/${id}`);
  }

  createMinuta(body: any) {
    return this._http.post(`${this.siteUrl}/minutas`, body);
  }

  updateData(id: string, body: any) {
    return this._http.post(`${this.siteUrl}/minutas/${id}`, body);
  }

  deleteData() {}
}
