import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  REST_API: string = 'http://localhost:3000/api/v1/users';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  // User Info
  getUserInfo() {
    return this.httpClient.get<User>(this.REST_API, {
      headers: this.httpHeaders,
    });
  }

  updateUser(data: object, file: FormData) {
    return this.httpClient.put(
      this.REST_API,
      {},
      {
        headers: this.httpHeaders,
      }
    );
  }
}
