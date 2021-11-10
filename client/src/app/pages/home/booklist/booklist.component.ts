import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/components/category/type';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss'],
})
export class BooklistComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  imgUrl = '../../assets/images/Book1.jfif';

  @Output() onSelect1 = new EventEmitter();

  getIndex!: number;
  getCate: string = '';
  booklist: Book[] = [];
  temp1: Book[] = [];
  booklistCurrent: Book[] = [];

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.category && params.category != this.getCate) {
        this.getCate = params.category;
      }
    });

    this.service.getBooks().subscribe((res) => {
      this.booklist = [...res];
      this.length = this.booklist.length;
      this.booklist = [
        ...this.booklist.filter((item) =>
          item.categories.includes(this.getCate)
        ),
      ];
      this.filterBook();
    });
  }

  filterBook(getIndex: number = 10, pageIndex: number = 1) {
    // this.temp1.push(...this.booklist);
    // this.booklist = [];
    // this.booklist = this.temp1;
    // console.log(getIndex);
    // this.booklist = this.booklist.filter((item, index) => {
    //   if ((pageIndex == 1)) {
    //     return index < getIndex * pageIndex;
    //   } else if (pageIndex > 1) {
    //     return index < getIndex * pageIndex && index >= (getIndex * (pageIndex-1));
    //   } 
    //   return 0;
    // });
    
    this.booklistCurrent = this.booklist.filter((item, index) => {
      if ((pageIndex == 1)) {
        return index < getIndex * pageIndex;
      } else if (pageIndex > 1) {
        return index < getIndex * pageIndex && index >= (getIndex * (pageIndex-1));
      } 
      return 0;
    });
    console.log(this.booklistCurrent);
  }

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/Book1.jfif';
  }

  test(vv: number){
    console.log("ddd"+vv)
  }

  onSelectBookList() {
    this.onSelect1.emit(false);
  }

  // MatPaginator Inputs
  length!: number;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 20];

  // MatPaginator Output
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  //Link

  detailNavigate(productId: string) {
    this.router.navigate([`book`, productId], { relativeTo: this.route });
    console.log('value = ' + productId);
  }
}
