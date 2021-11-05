import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSearch, faShoppingCart, faBars  } from '@fortawesome/free-solid-svg-icons';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faBars = faBars;

  @Input() islogin:boolean = false;
  loginDialogIsOpen:boolean = false;
  signupDialogIsOpen:boolean = false;

  username:string = '';
  password:String = '';
  confirm_password:string = '';
  fName:string= '';
  lName:String= '';
  datebirth:String= '';
  email:String= '';
  phoneno:String= '';
  formEmail = new FormControl('', [Validators.required, Validators.email]);
  formPhone = new FormControl('', [Validators.required, Validators.pattern('[0-9]\\d{9}')]);
  form = new FormControl('', [Validators.required]);

  imgUrl = '../../assets/images/logo.png';

  @Output() onSelect2 = new EventEmitter;

  onSelectHomeIcon() {
    this.onSelect2.emit(true);
  }


  constructor() { }


  ngOnInit(): void {
  }

  doSomethingOnError(event:any) {
    event.target.src = '../../assets/images/logo.png'

  }
  getErrorMessage() {
    if (this.form.hasError('required')) {
      return 'กรุณากรอกข้อมูลให้ครบ';
    }
    return '';
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

