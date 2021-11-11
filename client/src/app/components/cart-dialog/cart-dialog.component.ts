import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit {

  header: string = '';
  content: string = '';
  buttonText: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
