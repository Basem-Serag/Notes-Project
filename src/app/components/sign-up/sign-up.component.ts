import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fName: [null, Validators.required],
      lName: [null, Validators.required],
      age: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/123456/)]],
    });
  }
}
