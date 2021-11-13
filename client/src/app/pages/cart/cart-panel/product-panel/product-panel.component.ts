import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  DoCheck,
} from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { Carts } from 'src/app/models/cart';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss'],
})
export class ProductPanelComponent implements OnInit, DoCheck {
  
  faTrash = faTrash;
  cartlist: Carts[] = [];
  @Output() totalPrice = new EventEmitter();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((res) => {
      this.cartService.cartList = [...res];
    });
  }

  ngDoCheck(): void {
    this.cartlist = this.cartService.cartList;
    let totalPrice = 0;
    this.cartlist.forEach((item) => {
      totalPrice += item.totalPrice;
    });
    this.totalPrice.emit(totalPrice);
    this.cartService.countItem = this.cartlist.length;
  }

  onDelete(cartId: string) {
    this.cartService.deleteCart(cartId).subscribe(() => {
      this.cartService.cartList = this.cartService.cartList.filter(
        (item) => cartId != item._id
      );
    });
  }

  onUpdate(cartId: string, value: number) {
    this.cartService.updateCart(cartId, value).subscribe(() => {
      this.cartService.getCart().subscribe((res) => {
        this.cartService.cartList = [...res];
      });
    });
  }
}
