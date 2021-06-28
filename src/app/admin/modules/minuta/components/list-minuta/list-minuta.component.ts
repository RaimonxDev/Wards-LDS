import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-minuta',
  templateUrl: './list-minuta.component.html',
  styleUrls: ['./list-minuta.component.scss'],
})
export class ListMinutaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  editar() {
    console.log('editando');
  }
}
