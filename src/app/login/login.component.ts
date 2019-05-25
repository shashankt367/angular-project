import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSubmitted: boolean;
  constructor(private formBuilder: FormBuilder,private loginservice:LoginService,private router:Router) { }
  loginForm: FormGroup;
  loading: boolean;
  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
  });
  }
  get formControls() { return this.loginForm.controls; }
  login(){
    //console.log(this.loginForm.value);
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.loginservice.login(this.loginForm.value)
    .subscribe(status=>{
      var data=JSON.parse(JSON.stringify(status));
      if(data.status){
        alert(data.message);
        this.router.navigateByUrl('/home');
        //console.log(JSON.stringify(data.data));
      }
      else{
          alert(data.message);
          this.loading = false;
        //console.log(JSON.stringify(data.message));
      }
    });
      
  }

}
