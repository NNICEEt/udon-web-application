import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss'],
})
export class BooklistComponent implements OnInit{
  faShoppingCart = faShoppingCart;
  imgUrl = '../../assets/images/Book1.jfif';

  @Output() onSelect1 = new EventEmitter();
  
  counter: number = 1;
  booklist: any = [];
  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.homeBook().subscribe((response) => {
      this.booklist = response;
      console.log(this.booklist);
    });
  }

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/Book1.jfif';
  }

  onSelectBookList() {
    this.onSelect1.emit(false);
  }

  getValueService(value1: any,value2: any){
    this.service.limit = value1
    this.service.page = value2
  }

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [12,16,20];

  // MatPaginator Output
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent;

  
}


