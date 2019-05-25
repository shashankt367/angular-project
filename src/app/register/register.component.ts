import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MustMatch } from 'src/app/validators/password.validators'
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading: boolean;
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      user: ['', Validators.required],
      name: ['', Validators.required],
      number: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('pass', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { 
    return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.registerService.signUp(this.registerForm.value)
      .subscribe(status => {
        var data = JSON.parse(JSON.stringify(status));
        if (data.status) {
          alert(data.message);
          this.router.navigateByUrl('/login');
          //console.log(JSON.stringify(data.data));
        }
        else {
          alert(data.message);
          this.loading = false;
          //console.log(JSON.stringify(data.message));
        }
      });
  }
}
