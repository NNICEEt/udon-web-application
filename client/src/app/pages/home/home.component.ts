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
  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.service.isLogin().subscribe((res) => {
      this.isLogin = res != 'Unauthorized' && res != 'Forbidden' ;
    });
  }

  onChange(value: boolean) {
    this.getPage = value;
  }
}
