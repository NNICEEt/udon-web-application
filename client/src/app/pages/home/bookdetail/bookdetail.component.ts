import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.scss']
})
export class BookdetailComponent implements OnInit {
  imgUrl = '../../assets/images/Book1.jfif';

  @Output() onSelect3 = new EventEmitter;
  
  
  constructor() { }

  ngOnInit(): void {
  }

  doSomethingOnError(event:any) {
    event.target.src = '../../assets/images/Book1.jfif'
  }

  onSelectAddCart() {
    this.onSelect3.emit(true);
  }

  

}
