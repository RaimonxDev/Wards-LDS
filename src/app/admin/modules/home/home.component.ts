import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/user/services/user.service';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../core/models/user.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser!: UserInfo;

  constructor(private _UserServices: UserService) {}

  ngOnInit(): void {
    this._UserServices.user$.subscribe((resp) => {
      this.currentUser = resp;
      console.log(resp);
    });
  }
}
