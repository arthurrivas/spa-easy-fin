import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { LoginModel} from 'src/app/models/login-model'

@Injectable({
    providedIn: "root"
})
export class LoginService{

    constructor (private httpClient: HttpClient){
    }

    private readonly baseUrl = environment['baseUrl']

    async loginUser(credentials: LoginModel) {
        return await this.httpClient
          .post<any>(`${this.baseUrl}/login`, credentials, {
            observe: 'response',
            responseType: 'json',
          })
          .subscribe((res) => console.log(res.headers.get('Authorization')));
    }
}