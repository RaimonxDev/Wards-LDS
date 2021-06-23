import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('matDrawer', { static: true })
  matDrawer!: MatDrawer;

  constructor() {}

  ngOnInit(): void {
    this.matDrawer.close();
  }
  changeStateSidenav(state: boolean) {
    this.matDrawer.toggle();
  }
  ngOnDestroy() {}
}
