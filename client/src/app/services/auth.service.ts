import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  REST_API: string = 'http://localhost:3000/api/v1/users';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  //Register
  register(data: object) {
    const API_URL = `${this.REST_API}/register`;
    return this.httpClient.post<Register>(API_URL, data, { headers: this.httpHeaders });
  }

  //Login
  login(data: object) {
    const API_URL = `${this.REST_API}/login`;
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders });
  }

  //Login (admin)
  loginAdmin(data: object) {
    const API_URL = `${this.REST_API}/login-admin`;
    return this.httpClient
      .post(API_URL, data, { headers: this.httpHeaders })
      .subscribe((res) => res);
  }

  //Refrest AccessToken
  refrestAccessToken(token: string) {
    const API_URL = `${this.REST_API}/login-admin`;
    return this.httpClient
      .post(API_URL, { token }, { headers: this.httpHeaders })
      .subscribe((res) => res);
  }

  //Check Logging in
  isLogin() {
    const API_URL = this.REST_API;
    return this.httpClient.get(API_URL);
  }
}
