import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { LoginModel } from 'app/models/login-model';
import { Router } from '@angular/router';
import {UserStorageService} from "../store/user-store.config";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userStorageService: UserStorageService
  ) {}

  private readonly baseUrl = environment['baseUrl'];

  async loginUser(credentials: LoginModel) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/login`, credentials, {
        observe: 'response',
        responseType: 'json'
      })
      .subscribe((res) => {

        let token = res.headers.get('Authorization')

        this.userStorageService.setToken(token)
        this.router.navigate(['dashboard'])

      })
  }

  public logoff(){
    this.userStorageService.removeToken()
  }

}
