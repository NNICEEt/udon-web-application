import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  getPage: boolean = true;
  isLogin: boolean = false;
  cate:string ="";
  constructor(private service: AuthService) {}

  ngOnInit(): void {
  }

  onChange(value: boolean) {
    this.getPage = value;
  }

  onSet(cate: string){
    this.cate = cate;
    console.log("cate : "+this.cate)
  }

  test(){
    console.log(this.cate)
  }
}
