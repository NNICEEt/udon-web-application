import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.scss']
})
export class BookdetailComponent implements OnInit {
  imgUrl = '../../assets/images/Book1.jfif';

  @Output() onSelect3 = new EventEmitter;
  bookdetail: any = {};

  constructor(
    private service: ProductService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = params.productId;
      console.log(params);
      this.service.bookDetail(id).subscribe((response) => {
        this.bookdetail = response;
        console.log(this.bookdetail);
      });
    })

  }

  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/Book1.jfif'
  }

  



}
