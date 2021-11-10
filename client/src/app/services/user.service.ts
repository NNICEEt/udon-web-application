import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  REST_API: string = 'http://localhost:3000/api/v1/users';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  //Update Password
  updatePassword(password: string) {
    const API_URL = `${this.REST_API}/password`;
    return this.httpClient.put(API_URL, {password});
  }
}
