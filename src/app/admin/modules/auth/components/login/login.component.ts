import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      indetifier: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    if (this.loginForm.valid) {
      console.log('send');
    }
  }
}
