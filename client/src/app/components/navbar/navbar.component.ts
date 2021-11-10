import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faSearch,
  faShoppingCart,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  islogin: boolean = false;
  ngOnInit(): void {
    this.islogin = this.authService.loggedIn();
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
    this.router.navigate(['']).then(() => {
      window.location.reload();
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
