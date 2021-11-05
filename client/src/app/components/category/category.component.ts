import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/services/product.service';
import { Book } from './type';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  imgUrl = '../../assets/images/Book1.jfif';
  
  @Input() page:boolean = true;
  
  counter:number = 1;
  booklist: Book[] = [];
  
  constructor(private service: ProductService) { }
  
  ngOnInit(): void {
    this.service.homeBook()
    .subscribe(response=>{
      this.booklist = response;
    })
    
  }

  getBookDetail(id: string){

  }
  
  
  //   {
  //     "id": 1,
  //     "tag": "นิยาย",
  //     "name": "[นิยาย] เกิดชาตินี้พี่ต้องเทพ เล่ม 12",
  //     "price": 279,
  //     "imgUrl": "../../assets/images/Book1.jfif",
  //     "detail": "textdetail"
  //   },
  
  //   {
  //     "id": 2,
  //     "tag": "การ์ตูน",
  //     "name": "[การ์ตูน] ปกรณัมของเหล่าภูต เล่ม 7",
  //     "price": 277,
  //     "imgUrl": "../../assets/images/Book2.jfif",
  //     "detail": "textdetail"
  //   },
  
  //   {
  //     "id": 3,
  //     "tag": "การ์ตูน",
  //     "name": "[การ์ตูน] มาสค์ไรเดอร์คูกะ เล่ม 10",
  //     "price": 277,
  //     "imgUrl": "../../assets/images/Book3.jfif",
  //     "detail": "textdetail"
  //   },
  
  //   {
  //     "id": 4,
  //     "tag": "นิยาย",
  //     "name": "[นิยาย] Re:ZERO รีเซทชีวิต ฝ่าวิกฤตต่างโลก เล่ม 10",
  //     "price": 277,
  //     "imgUrl": "../../assets/images/Book4.jfif",
  //     "detail": "textdetail"
  //   },
  
  //   {
  //     "id": 5,
  //     "tag": "การ์ตูน",
  //     "name": "[การ์ตูน] One Punch Man เล่ม 20",
  //     "price": 277,
  //     "imgUrl": "../../assets/images/Book5.jfif",
  //     "detail": "textdetail"
  //   },
  // ]
    doSomethingOnError(event:any) {
      event.target.src = '../../assets/images/Book1.jfif'
  
    }
  
    decrease() {
      if(this.counter-1>=1)
      this.counter = --this.counter;
  
    }
  
    increase() {
      if(this.counter+1<=100)
      this.counter= ++this.counter;
  
    }
  
    hide(){
      this.page = false;
  
    }
  
    addcart(){
      this.counter = 1;
    }
  
  
  
  
  }
