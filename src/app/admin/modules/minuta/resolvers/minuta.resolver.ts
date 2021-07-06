import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tipoMinutas } from '../models/minuta.models';
import { MinutaService } from '../services/minuta.service';

@Injectable({
  providedIn: 'root',
})
export class tiposDeMinutaResolver implements Resolve<tipoMinutas[]> {
  constructor(private _minutaService: MinutaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<tipoMinutas[]> {
    return this._minutaService.getTiposDeMinutas();
  }
}
