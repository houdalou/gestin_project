import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RegisterRequest } from '../models/register-request';


export interface LoginResponse {
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private http = inject(HttpClient);


  private api = 'http://localhost:8080/api/auth';



  register(request: RegisterRequest): Observable<string> {

    return this.http.post(
      `${this.api}/register`,
      request,
      {
        responseType: 'text'
      }
    );

  }



  login(
    request: {
      username: string;
      password: string;
    }
  ): Observable<LoginResponse> {


    return this.http.post<LoginResponse>(
      `${this.api}/login`,
      request
    );

  }

}