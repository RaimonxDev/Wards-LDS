import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Minuta } from '../../models/minuta.models';
import { MinutaService } from '../../services/minuta.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-minuta',
  templateUrl: './list-minuta.component.html',
  styleUrls: ['./list-minuta.component.scss'],
})
export class ListMinutaComponent implements OnInit {
  minutas$!: Observable<Minuta[]>;
  constructor(private _minutaService: MinutaService) {}

  ngOnInit(): void {
    this.minutas$ = this._minutaService.minutas$.pipe(
      tap((data) => console.log(data))
    );
  }

  editar() {
    console.log('editando');
  }
}
