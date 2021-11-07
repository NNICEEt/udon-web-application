import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSearch, faShoppingCart, faBars  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faBars = faBars;

  username:string = '';
  password:String = '';
  fName:string= '';
  lName:String= '';
  datebirth:String= '';
  email:String= '';
  phoneno:String= '';

  imgUrl = '../../assets/images/logo.png';

  doSomethingOnError(event:any) {
    event.target.src = '../../assets/images/logo.png'
  }
  //Page Changer
  loginDialogIsOpen:boolean = false;
  signupDialogIsOpen:boolean = false;
  @Input() islogin:boolean = false;
  @Output() onSelect2 = new EventEmitter;
  onSelectHomeIcon() {
    this.onSelect2.emit(true);
  }
  openLogin(){
    this.loginDialogIsOpen = true;
  }
  openSignup(){
    this.signupDialogIsOpen = true;
  }
  pressCancel() {
    this.loginDialogIsOpen = false;
    this.signupDialogIsOpen = false;
  }
  pressLogin() {
    console.log(this.username);
  }

}

