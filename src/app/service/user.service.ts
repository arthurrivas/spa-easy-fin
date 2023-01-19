import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'app/models/user-model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['baseUrl'];

  getCurrentUser(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.baseUrl}/user/current`);
  }
}
