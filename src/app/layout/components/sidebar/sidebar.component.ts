import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(private _authServices: AuthService) {}

  ngOnInit(): void {}

  logoutUser() {
    this._authServices.logout();
  }
}
