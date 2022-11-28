import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login-model';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
   ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    })
  }

  submitLogin(){
    var loginInfo = this.loginForm?.getRawValue() as LoginModel

    // console.log(loginInfo)

    let result = this.loginService.loginUser(loginInfo)

    // console.log(result)
  }
}
