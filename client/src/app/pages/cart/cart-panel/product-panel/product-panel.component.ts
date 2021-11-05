import { Component, Input, OnInit } from '@angular/core';
import {
  faTrash,
  faShoppingCart,
  faHome,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

export interface PeriodicElement {
  imgURL: string;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { imgURL:'../../../../../assets/images/Book1.jfif', title: 'นิยาย', price:150, quantity:1, total: 300 },
  { imgURL:'../../../../../assets/images/Book1.jfif', title: 'นิยาย', price:150, quantity:2, total: 300 }
];

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss'],
})

export class ProductPanelComponent implements OnInit {
  faTrash = faTrash;

  displayedColumns = ['imgURL', 'title', 'price', 'quantity', 'total', 'btn'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
