import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carts } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  REST_API: string = 'http://localhost:3000/api/v1/carts/';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  //ADD Cart
  addToCart(productId:string, quantity:number) {
    return this.httpClient.post(this.REST_API, {productId, quantity});
  }

  //Get Cart
  getCart() {
    return this.httpClient.get<Carts>(this.REST_API);
  }

  //Update Cart
  updateCart(cartId: string, quantity:number) {
    return this.httpClient.put(`${this.REST_API}${cartId}`, {quantity});
  }

  //Delete  Cart
  deleteCart(cartId: string) {
    return this.httpClient.delete(`${this.REST_API}${cartId}`);
  }
}
