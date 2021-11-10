import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Carts } from 'src/app/models/cart';

@Component({
  selector: 'app-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent implements OnInit {

  cartlist: Carts[] = [];
  constructor(private service: CartService ) { }

  ngOnInit(): void {
    this.service.getCart().subscribe(res => {
      this.cartlist = [...res];
    })
  }

}
