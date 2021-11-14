import { Component, OnInit } from '@angular/core';
import {
  faTrash,
  faShoppingCart,
  faHome,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss'],
})
export class CartPanelComponent implements OnInit {

  faTrash = faTrash;
  faShoppingCart = faShoppingCart;
  totalPrice: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  getTotalPrice (value: number) {
    this.totalPrice = value;
  }
  onDeleteAll() {
    this.cartService.deleteAllCart().subscribe(() => {
      this.cartService.cartList = [];
    });
  }

}
