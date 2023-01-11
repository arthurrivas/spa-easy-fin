import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { LoginModel } from 'app/models/login-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  private readonly baseUrl = environment['baseUrl'];

  async loginUser(credentials: LoginModel) {
    return await this.httpClient
      .post<any>(`${this.baseUrl}/login`, credentials, {
        observe: 'response',
        responseType: 'json',
      })
      .subscribe((res) => {
        
        let token = res.headers.get('Authorization')

        if (token != null) {
          window.localStorage.setItem('token', token)
          this.router.navigate(['dashboard'])
        }
      }
      );
  }

  async getCurrentUser(){
    return await this.httpClient.get(`${this.baseUrl}/user/current`, {observe: 'response', responseType: 'json'})
      .subscribe((res) => {


        console.log(res)

      })
  }
}
