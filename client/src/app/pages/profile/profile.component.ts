import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //Image URL
  imgUrl = '../../assets/images/userpic.png';
  //Change Page Boolean
  page:number = 1;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/userpic.png';
  }
  onChange(value: number){
    this.page = value;
  }

}
