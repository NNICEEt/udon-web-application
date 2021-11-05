import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  REST_API: string = 'http://localhost:3000/api/v1/users';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  //Register
  register(data: object) {
    const APL_URL = `${this.REST_API}/register`;
    return this.httpClient
      .post(APL_URL, data, { headers: this.httpHeaders })
      .subscribe((res) => res);
  }

  //Login
  login(data: object) {
    const APL_URL = `${this.REST_API}/login`;
    return this.httpClient
      .post(APL_URL, data, { headers: this.httpHeaders })
      .subscribe((res) => res);
  }

  //Login (admin)
  loginAdmin(data: object) {
    const APL_URL = `${this.REST_API}/login-admin`;
    return this.httpClient
      .post(APL_URL, data, { headers: this.httpHeaders })
      .subscribe((res) => res);
  }

  //Refrest AccessToken
  refrestAccessToken(token: string) {
    const APL_URL = `${this.REST_API}/login-admin`;
    return this.httpClient
      .post(APL_URL, { token }, { headers: this.httpHeaders })
      .subscribe((res) => res);
  }
  
}
