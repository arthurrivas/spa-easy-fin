import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {Page} from "../models/page";

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private httpClient: HttpClient) {}

  private readonly baseUrl = environment['baseUrl'] + '/city';


  searchCity(name: string): Observable<Page> {
    return this.httpClient.get<Page>(`${this.baseUrl}`, {params: {"name": name} });
  }

}
