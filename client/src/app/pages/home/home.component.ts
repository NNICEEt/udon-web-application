import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  getPage:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(value: boolean){
    this.getPage = value;
  }

}
