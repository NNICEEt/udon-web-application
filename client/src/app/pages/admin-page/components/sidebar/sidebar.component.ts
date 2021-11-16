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
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Book } from 'src/app/models/booktype';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';


@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit{
  inputDisable: boolean = true;
  faShoppingCart = faShoppingCart;
  imgUrl = '../../assets/images/Book1.jfif';

  getIndex!: number;
  booklist: Book[] = [];
  booklistCurrent: Book[] = [];

  mySubscription: any;

  constructor(
    private cartService: CartService,
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.getBooks().subscribe((res) => {
      this.service.adminList = [...res];
      this.length = this.service.adminList.length;
      this.filterBook();
    });
  }

  reloadComponent() {
    // this.router.navigate([''], { queryParams: { category: 'การ์ตูน' } });
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  
  filterBook(getIndex: number = 10, pageIndex: number = 1) {
    this.booklistCurrent = this.service.adminList.filter((item, index) => {
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

  editInput() {
    this.inputDisable = false;
  }


  updateInput() {
    this.inputDisable = true;
  }

  deleteBook(productId: string) {
    this.service.deleteBook(productId).subscribe(() => {
      this.service.adminList = this.service.adminList.filter(
        (item) => productId != item._id
      );
    });
    this.dialog.open(DeleteDialogComponent);
    this.reloadComponent();
    console.log("deleteTo")
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
}
