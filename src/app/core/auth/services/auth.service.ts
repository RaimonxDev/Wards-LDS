import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;

  // Setter and Getters
  set accessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  get accessToken(): string {
    return localStorage.getItem('access_token') ?? '';
  }

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) {}

  signIn(credentials: {
    identifier: string;
    password: string;
  }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post('api/auth/sign-in', credentials).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage
        this.accessToken = response.access_token;

        // Set the authenticated flag to true
        this._authenticated = true;

        // Actualiza la informacion del Usuario
        this._userService.user = response.user;

        // Return a new observable with the response
        return of(response);
      })
    );
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('access_token');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
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
    return of(false);
  }
}
