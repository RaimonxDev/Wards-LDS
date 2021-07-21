import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Minuta } from '../../models/minuta.models';
import { MinutaService } from '../../services/minuta.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../../ui/alert/services/alert.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-minuta',
  templateUrl: './list-minuta.component.html',
  styleUrls: ['./list-minuta.component.scss'],
})
export class ListMinutaComponent implements OnInit {
  minutas$!: Observable<Minuta[]>;
  constructor(
    private _minutaService: MinutaService,
    private _router: Router,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    this.minutas$ = this._minutaService.minutas$.pipe(
      tap((resp) => console.log(resp))
    );
  }

  details(minutaID: string | undefined) {
    if (minutaID === undefined) {
      this._alert.opendAlert('Ups', 'Ha ucurrido un error', 'warning');
      return;
    }
    this._router.navigate(['minuta/details', minutaID]);
  }
}
