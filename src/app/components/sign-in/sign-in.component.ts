import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  successMsg: string = '';
  errMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  get f() {
    return this.signInForm.controls;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.isLoading = true;
      this._AuthService.signIn(this.signInForm.value).subscribe((data) => {
        if (data.message == 'success') {
          localStorage.setItem("TOKEN", data.token);
          this._Router.navigate(['/profile']);
          this.signInForm.reset();
          this.isSuccess = true;
          this.isError = false;
          this.isLoading = false;
          this.successMsg = data.message;
          console.log(data);
        } else {
          this.isLoading = false;
          this.isSuccess = false;
          this.isError = true;
          this.errMsg = data.message;
          console.log(data);
        }
      });
    }
  }
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    });
  }
}
