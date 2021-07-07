import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Minuta } from '../../models/minuta.models';
import { MinutaService } from '../../services/minuta.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-minuta',
  templateUrl: './list-minuta.component.html',
  styleUrls: ['./list-minuta.component.scss'],
})
export class ListMinutaComponent implements OnInit {
  minutas$!: Observable<Minuta[]>;
  constructor(private _minutaService: MinutaService, private _router: Router) {}

  ngOnInit(): void {
    this.minutas$ = this._minutaService.minutas$;
  }

  details(minutaID: string) {
    console.log(minutaID);
    this._router.navigate(['minuta/details', minutaID]);
  }
}
