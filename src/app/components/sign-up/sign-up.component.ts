import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
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
    return this.signUpForm.controls;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this._AuthService.signUp(this.signUpForm.value).subscribe((data) => {
        if (data.message == 'success') {
          this.signUpForm.reset();
          this.isSuccess = true;
          this.isError = false;
          this.isLoading = false;
          this._Router.navigate(['/signin']);
          this.successMsg = data.message;
        } else {
          this.isLoading = false;
          this.isSuccess = false;
          this.isError = true;
          this.errMsg = data.errors.email.message;
        }
      });
    }
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
    });
  }
}
