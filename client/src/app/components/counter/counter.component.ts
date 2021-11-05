import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {

  @Input() num:number = 1;
  @Input() counterHeight = '40px';
  @Input() inputWidth = '100px';
  @Input() btnWidth = '30px';
  @Input() fontSize = '16px';
  @Output() counter = new EventEmitter;

  constructor() {}

  ngOnInit(): void {}

  decrease() {
    if (this.num - 1 >= 1) this.num = --this.num;
    this.counter.emit(this.num);
  }

  increase() {
    if (this.num + 1 <= 100) this.num = ++this.num;
    this.counter.emit(this.num);
  }
}
