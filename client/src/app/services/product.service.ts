import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../components/category/type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  pageBookList: string = 'false';

  limit:number = 10;
  page:number = 1;
  category:any = "";
  

  REST_API: string = 'http://localhost:3000/api/v1/products/';

  constructor(private httpClient: HttpClient) {}

  //homeBook
  getBooks(){
    return this.httpClient.get<Book[]>(this.REST_API)
  }
  
  //bookDetail
  bookDetail(productId : string) {
    return this.httpClient.get<Book>(`${this.REST_API}${productId}`);
  }
}
