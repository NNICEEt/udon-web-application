import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import {
  faSearch,
  faShoppingCart,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, DoCheck {
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}
  itemCart!:number;
  islogin: boolean = false;

  ngOnInit(): void {
    this.islogin = this.authService.loggedIn();
    this.cartService.getCart().subscribe((res) => {
      this.cartService.countItem = res.length;
    });
  }

  ngDoCheck(): void {
    this.itemCart = this.cartService.countItem;
  }

  data = 1;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faBars = faBars;

  imgUrl = '../../assets/images/logo.png';

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/logo.png';
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
