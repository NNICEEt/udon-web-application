import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/booktype';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  booklist: Book[] = [];

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.getBooks().subscribe((res) => {
      this.booklist = [...res];
    });
  }

}
