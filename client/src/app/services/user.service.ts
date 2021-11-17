import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  REST_API: string = `${environment.service}/api/v1/users`;

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  //Update Password
  updatePassword(password: string) {
    const API_URL = `${this.REST_API}/password`;
    return this.httpClient.put(API_URL, {password});
  }
  // User Info
  getUserInfo() {
    return this.httpClient.get<User>(this.REST_API, {
      headers: this.httpHeaders,
    });
  }

  updateUser(data: object) {
    return this.httpClient.put(this.REST_API, data, {
      headers: this.httpHeaders,
    });
  }

  uploadImg(file: FormData) {
    const API_URL = `${this.REST_API}/file`;
    return this.httpClient.post(API_URL, file);
  }
}
