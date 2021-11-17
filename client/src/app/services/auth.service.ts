import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register, Login } from '../models/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  REST_API: string = `${environment.service}/api/v1/users`;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  //Register
  register(data: object) {
    const API_URL = `${this.REST_API}/register`;
    return this.httpClient.post<Register>(API_URL, data, {
      headers: this.httpHeaders,
    });
  }

  //Login
  login(data: object) {
    const API_URL = `${this.REST_API}/login`;
    return this.httpClient.post<Login>(API_URL, data, {
      headers: this.httpHeaders,
    });
  }

  //Login (admin)
  loginAdmin(data: object) {
    const API_URL = `${this.REST_API}/login-admin`;
    return this.httpClient.post<Login>(API_URL, data, {
      headers: this.httpHeaders,
    });
  }

  //Logout
  logout() {
    localStorage.removeItem('token');
  }

  //Refrest AccessToken
  refrestAccessToken(token: string) {
    const API_URL = `${this.REST_API}/login-admin`;
    let newToken;
    this.httpClient.post(API_URL, { token }, { headers: this.httpHeaders });
    return newToken;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
