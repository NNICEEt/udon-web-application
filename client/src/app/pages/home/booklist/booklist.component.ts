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
import { Book } from 'src/app/models/booktype';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss'],
})
export class BooklistComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  imgUrl = '../../assets/images/Book1.jfif';

  getIndex!: number;
  getCate: string = '';
  booklist: Book[] = [];
  temp1: Book[] = [];
  booklistCurrent: Book[] = [];

  constructor(
    private cartService: CartService,
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
    this.booklistCurrent = this.booklist.filter((item, index) => {
      if (pageIndex == 1) {
        return index < getIndex * pageIndex;
      } else if (pageIndex > 1) {
        return (
          index < getIndex * pageIndex && index >= getIndex * (pageIndex - 1)
        );
      }
      return 0;
    });
    console.log(this.booklistCurrent);
  }

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/Book1.jfif';
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

  addCart(productId: string) {
    this.cartService.addToCart(productId, 1).subscribe(()=>{
      this.cartService.getCart().subscribe((res) => {
        this.cartService.countItem = res.length;
      });
    },err=>{
      this.router.navigate(['cart']);
    });
  }
}
