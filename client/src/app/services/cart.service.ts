import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carts } from '../models/cart';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  public countItem:number = 0;
  public cartList:Carts[] = [];

  REST_API: string = `${environment.service}/api/v1/carts`;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  //ADD Cart
  addToCart(productId:string, quantity:number) {
    return this.httpClient.post(this.REST_API, {productId, quantity});
  }

  //Get Cart
  getCart() {
    return this.httpClient.get<Carts[]>(this.REST_API);
  }

  //Update Cart
  updateCart(cartId: string, quantity:number) {
    return this.httpClient.put(`${this.REST_API}${cartId}`, {quantity});
  }

  //Delete  Cart
  deleteCart(cartId: string) {
    return this.httpClient.delete(`${this.REST_API}${cartId}`);
  }

  //Delete All
  deleteAllCart() {
    return this.httpClient.delete(this.REST_API);
  }

}
