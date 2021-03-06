import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from 'src/app/components/cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.scss']
})
export class BookdetailComponent implements OnInit {
  imgUrl = '../../assets/images/Book1.jfif';

  bookdetail: any = {};
  quantity: number = 1;


  constructor(
    private cartService: CartService,
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.productId;
      console.log(params);
      this.service.bookDetail(id).subscribe((response) => {
        this.bookdetail = response;
        console.log(this.bookdetail);
      });
    })
  }

  addCart(){
    this.route.params.subscribe(params => {
      const id = params.productId;
      console.log(params);
      this.cartService.addToCart(id, this.quantity).subscribe(() => {
        this.dialog.open(CartDialogComponent);
        this.cartService.getCart().subscribe((res) => {
          this.cartService.countItem = res.length;
        });
        this.router.navigate(['']);
      });
    })
  }

  getCounter(counter : number){
    this.quantity = counter;
  }

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/Book1.jfif'
  }
}
