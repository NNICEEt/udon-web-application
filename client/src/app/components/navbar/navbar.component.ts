import {
  Component,
  OnInit,
  DoCheck,
  HostListener
} from '@angular/core';
import {
  faSearch,
  faShoppingCart,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/booktype';
import { ProductService } from 'src/app/services/product.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, DoCheck {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private service: ProductService,
    private route: ActivatedRoute
  ) {}
  booklist: Book[] = [];
  bookname: Book[] = [];
  itemCart!: number;
  islogin: boolean = false;
  myControl = new FormControl();
  filteredOptions!: Observable<Book[]>;
  isMobile: boolean = false;
  isUnReadable: boolean = false;

  ngOnInit(): void {
    this.islogin = this.authService.loggedIn();
    this.service.getBooks().subscribe((res) => {
      this.booklist = [...res];
      this.bookname = this.booklist;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
    this.cartService.getCart().subscribe((res) => {
      this.cartService.countItem = res.length;
    });
    if (window.screen.width < 768) {
      this.isMobile = true;
    } else if (window.screen.width << 425) {
      this.isUnReadable = true;
    }
    window.onresize = function(event: any){
      document.location.reload();
    }
  }

  ngDoCheck(): void {
    this.itemCart = this.cartService.countItem;
  }

  private _filter(value: string): Book[] {
    const filterValue = value.toLowerCase();
    return this.bookname.filter((item, i) =>
      item.title.toLowerCase().includes(filterValue)
    );
  }
  data = 1;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faBars = faBars;

  imgUrl = '../../assets/images/logo.png';

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/logo.png';
  }
  detailNavigate(productId: string) {
    this.router.navigate([`book`, productId], { relativeTo: this.route });
    console.log('value = ' + productId);
  }
  refresh() {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
