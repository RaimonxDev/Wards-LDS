import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Minuta } from '../../models/minuta.models';
import { MinutaService } from '../../services/minuta.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-details-minuta',
  templateUrl: './details-minuta.component.html',
  styleUrls: ['./details-minuta.component.scss'],
})
export class DetailsMinutaComponent implements OnInit {
  minuta$!: Observable<Minuta>;
  constructor(private _minutaServices: MinutaService) {}

  ngOnInit(): void {
    this.minuta$ = this._minutaServices.minuta$.pipe(
      tap((data) => console.log(data))
    );
  }
}
