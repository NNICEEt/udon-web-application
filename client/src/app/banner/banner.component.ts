import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {


  imgUrl = '../../assets/images/logo.png';
  imgUrl1 = '../../assets/images/banner2.png';

  constructor() { }

  ngOnInit(): void {
  }

  doSomethingOnError(event:any) {
    event.target.src = '../../assets/images/logo.png'

  }

}
