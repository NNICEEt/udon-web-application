import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../components/category/type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  pageBookList: string = 'false';

  REST_API: string = 'http://localhost:3000/api/v1/products/';

  constructor(private httpClient: HttpClient) { }

  //homeBook
  homeBook(){
    return this.httpClient.get(this.REST_API)
  }
  //bookDetail
  bookDetail(getProductId: String){
    return this.httpClient.get(this.REST_API+getProductId)
  }
}
