import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../../user/services/user.service';
import { environment } from '../../../../environments/environment';
import { User, Barrio, UserInfo, CheckUser } from '../../models/user.models';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  urlBackend = environment.siteUrl;

  private _authenticated: boolean = false;

  // Setter and Getters
  set accessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  set barrio(barrio: Barrio) {
    localStorage.setItem('barrio', JSON.stringify(barrio));
  }

  set barrioID(idBarrio: number) {
    localStorage.setItem('barrio_id', JSON.stringify(idBarrio));
  }

  set userID(idUser: number) {
    localStorage.setItem('user_id', JSON.stringify(idUser));
  }

  get accessToken(): string {
    return localStorage.getItem('access_token') ?? '';
  }

  // Parseamos el string a un numero la bases de datos devuelve un string
  get barrioID(): number {
    return parseInt(localStorage.getItem('barrio_id') as string) ?? -1;
  }
  get userID(): number {
    return parseInt(localStorage.getItem('user_id') as string) ?? -1;
  }

  get barrio(): Barrio {
    return JSON.parse(localStorage.getItem('barrio') ?? '');
  }

  get isAuthenticated() {
    return this._authenticated;
  }

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
    private _router: Router
  ) {}

  signIn(credentials: {
    identifier: string;
    password: string;
  }): Observable<User> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient
      .post<User>(`${this.urlBackend}/auth/local`, credentials)
      .pipe(
        switchMap((response: User) => {
          // Store the access token in the local storage
          this.accessToken = response.jwt;
          this.barrioID = response.user.barrio!.id;

          this.userID = response.user.id;
          this.barrio = response.user.barrio as Barrio;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Actualiza la informacion del Usuario
          this._userService.user = response.user;
          // Actualizamos el barrio
          this._userService.wardCurrentUser = response.user.barrio as Barrio;

          // Return a new observable with the response
          return of(response);
        })
      );
  }

  signInUsingToken(): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    });
    // Renew token
    // Usamos any para evitar error en el catchError
    return this._httpClient
      .get<CheckUser | any>(`${this.urlBackend}/users/me`, { headers })
      .pipe(
        catchError(() => {
          // Return false
          this._authenticated = false;

          return of(false);
        }),
        switchMap((response: CheckUser) => {
          // Comprobamos si el ID que recibimos es distinto al usuario anterior
          if (this.userID !== response.id) {
            this._authenticated = false;
            localStorage.clear();
            return of(false);
          }
          // Set the authenticated flag to true
          this._authenticated = true;
          // Actualiza la informacion del Usuario
          this._userService.user = response as UserInfo;
          // Return true
          return of(true);
        })
      );
  }

  logout(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.clear();

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    this._router.navigateByUrl('/login');
    return of(true);
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }
    return this.signInUsingToken();
  }
}
