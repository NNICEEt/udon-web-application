import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

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
    private serviceCart: CartService,
    private service: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

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
      this.serviceCart.addToCart(id, this.quantity).subscribe();
    })
    this.router.navigate(['cart']);
  }

  getCounter(counter : number){
    this.quantity = counter;
  }

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/Book1.jfif'
  }

  



}
