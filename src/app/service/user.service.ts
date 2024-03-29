import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from 'app/models/user-model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['baseUrl'] + '/user';


  getCurrentUser(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.baseUrl}/current`);
  }

  async getUserById(idUser: number): Promise<Observable<UserModel>>{
    return this.httpClient.get<UserModel>(`${this.baseUrl}/${idUser}`)
  }

  getUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${this.baseUrl}/`);
  }

  async createUser(newObj :UserModel): Promise<Observable<UserModel>>{
    return this.httpClient.post(`${this.baseUrl}/`, newObj)
  }
}
