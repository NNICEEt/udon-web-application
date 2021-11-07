import { Component, Input, OnInit } from '@angular/core';
import {
  faTrash,
  faShoppingCart,
  faHome,
  faCog,
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.scss'],
})

export class ProductPanelComponent implements OnInit {
  faTrash = faTrash;

  

  constructor() {}

  ngOnInit(): void {}
}
