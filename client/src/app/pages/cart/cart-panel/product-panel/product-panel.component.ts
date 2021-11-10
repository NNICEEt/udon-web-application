import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  faTrash,
  faShoppingCart,
  faHome,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { Carts } from 'src/app/models/cart';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss'],
})

export class ProductPanelComponent implements OnInit {
  faTrash = faTrash;
  cartlist: Carts[] = [];
  @Output() totalPrice = new EventEmitter();
  constructor(private service: CartService ) { }

  ngOnInit(): void {
    this.service.getCart().subscribe(res => {
      this.cartlist = [...res];
      let totalPrice = 0;
      this.cartlist.forEach(item => {
        totalPrice += item.totalPrice;
      });
      this.totalPrice.emit(totalPrice);
    })
  }
}
