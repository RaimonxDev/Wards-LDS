import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/user/services/user.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ErrorRequestUser } from '../../../core/models/user.models';
import { AlertService } from '../../../ui/alert/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  enableSessionWhitSocialMedia = false;
  constructor(
    private fb: FormBuilder,
    private _authServices: AuthService,
    private _userServices: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [''],
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.disable();
    this._authServices.signIn(this.loginForm.value).subscribe(
      (resp) => {
        // redireccion
        this._userServices.user = resp.user;
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
          '/signed-in-redirect';
        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (error: ErrorRequestUser) => {
        const idMsg = error?.error?.data[0].messages[0].id;

        if (error.status === 0) {
          this._alert.opendAlert(
            'Ups algo se rompio',
            'Si el error persiste, Por favor pongase en contacto con el Hermano Ramon Martinez',
            'warning',
            10000
          );
        }
        this.loginForm.enable();

        if (idMsg === 'Auth.form.error.invalid')
          this._alert.opendAlert(
            'Error',
            'Usuario o Contraseña invalida',
            'error',
            4000
          );
        if (idMsg === 'Auth.form.error.blocked') {
          this._alert.opendAlert(
            'Usuario Bloqueado',
            'Bloqueado, Por favor pongase en contacto con el Hermano Ramon Martinez',
            'warning',
            10000
          );
        }
      }
    );
  }
}
