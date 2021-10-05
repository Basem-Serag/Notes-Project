import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  public isValid: boolean = false;
    constructor(private fb: FormBuilder) {}

  get f() {
    return this.signInForm.controls;    
  }

  onSubmit() {
    
  }
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/123456/)]],
    });
  }
}
