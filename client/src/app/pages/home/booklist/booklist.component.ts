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

  getCate: string = '';
  booklist: Book[] = [];
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
      this.booklist = this.booklist.filter((item) =>
        item.categories.includes(this.getCate)
      );
    });
  }

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/Book1.jfif';
  }

  onSelectBookList() {
    this.onSelect1.emit(false);
  }

  getValueService(value1: any, value2: any) {
    this.service.limit = value1;
    this.service.page = value2;
    console.log('1 :' + this.service.limit);
  }

  // MatPaginator Inputs
  length!: number;
  pageSize = 10;
  pageSizeOptions: number[] = [100, 20, 25];

  // MatPaginator Output
  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();

  //Link

  detailNavigate(productId: string) {
    this.router.navigate([`book`, productId], { relativeTo: this.route });
    console.log('value = ' + productId);
  }
}
