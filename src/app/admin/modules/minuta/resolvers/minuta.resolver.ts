import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Minuta, tipoMinutas } from '../models/minuta.models';
import { MinutaService } from '../services/minuta.service';
import { catchError } from 'rxjs/operators';

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

// Obtiene Todas las minutas minutas
@Injectable({
  providedIn: 'root',
})
export class MinutasResolver implements Resolve<Minuta[]> {
  constructor(private _minutaService: MinutaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Minuta[]> {
    return this._minutaService.getMinutas();
  }
}

@Injectable({
  providedIn: 'root',
})
export class MinutaResolver implements Resolve<Minuta> {
  constructor(private _minutaService: MinutaService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Minuta> {
    return this._minutaService.getMinuta(route.paramMap.get('id')).pipe(
      catchError((error) => {
        console.log(state);
        return throwError(error);
      })
    );
  }
}
