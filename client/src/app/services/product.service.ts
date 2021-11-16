import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book, ImageURL } from '../models/booktype';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public adminList:Book[] = [];

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

  //deleteBook
  deleteBook(productId : string) {
    return this.httpClient.delete(`${this.REST_API}${productId}`);
  } 

  uploadImg(file: FormData) {
    const API_URL = `${this.REST_API}/file`;
    return this.httpClient.post<ImageURL>(API_URL, file);
  }
  
}
