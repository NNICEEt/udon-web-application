import { Component, OnInit } from '@angular/core';
import {
  faTrash,
  faShoppingCart,
  faHome,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss'],
})
export class CartPanelComponent implements OnInit {
  imgUrl = '../../assets/images/Book1.jfif';
  faTrash = faTrash;
  faShoppingCart = faShoppingCart;
  faHome = faHome;
  faCog = faCog;
  counter:number = 1;
  
  constructor() {}

  ngOnInit(): void {}

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/Book1.jfif';
  }
  decrease() {
    if (this.counter - 1 >= 1) this.counter = --this.counter;
  }

  increase() {
    if (this.counter + 1 <= 100) this.counter = ++this.counter;
  }
}
