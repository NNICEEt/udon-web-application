import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['admin']);
  }

  insert(){
    this.router.navigate(['admin/insert']);
  }
  dashBoard() {
    this.router.navigate(['admin/dashboard']);
  }

  refresh() {
    this.router.navigate(['admin/page']);
  }

}
