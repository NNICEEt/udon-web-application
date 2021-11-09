import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSearch, faShoppingCart, faBars  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  data = 1;
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faBars = faBars;

  imgUrl = '../../assets/images/logo.png';

  doSomethingOnError(event:any) {
    event.target.src = '../../assets/images/logo.png'
  }
  @Input() islogin:boolean = false;
  @Output() onSelect2 = new EventEmitter;
  onSelectHomeIcon() {
    this.onSelect2.emit(true);
  }

}

