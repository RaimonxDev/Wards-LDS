import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ErrorRequestUser } from '../../../core/models/user.models';

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
    private _activatedRoute: ActivatedRoute,
    private _router: Router
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
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
          '/signed-in-redirect';
        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (error: ErrorRequestUser) => {
        this.loginForm.enable();
        console.log(error.error.data[0].messages[0].message);
      }
    );
  }
}
