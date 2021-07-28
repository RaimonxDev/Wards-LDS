import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject, of, Subject } from 'rxjs';
import { Barrio, UserInfo, User, CheckUser } from '../../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<UserInfo> = new ReplaySubject<UserInfo>(1);
  private _wardCurrentUser: ReplaySubject<Barrio> = new ReplaySubject<Barrio>(
    1
  );

  set user(value: UserInfo) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<UserInfo | CheckUser> {
    return this._user.asObservable();
  }
  set wardCurrentUser(value: Barrio) {
    // Store the value
    this._wardCurrentUser.next(value);
  }

  get wardCurrentUser$(): Observable<Barrio> {
    return this._wardCurrentUser.asObservable();
  }

  constructor() {}
}
