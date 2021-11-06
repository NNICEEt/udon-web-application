import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSearch, faShoppingCart, faBars  } from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private fb: FormBuilder, private customValidator: CustomvalidationService) { }
  public LoginForm!: FormGroup;
  public RegisForm!: FormGroup;
  ngOnInit(): void {
    //Validations Form
    this.LoginForm = this.fb.group ({
      lUsername: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
    this.RegisForm = this.fb.group ({
      formUsername: new FormControl('', [Validators.required, Validators.minLength(5)]),
      formPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      formConfirm: new FormControl('', [Validators.required]),
      formfName: new FormControl('', [Validators.required]),
      formlName: new FormControl('', [Validators.required]),
      formDateBirth: new FormControl('', [Validators.required]),
      formEmail: new FormControl('', [Validators.required, Validators.email]),
      formPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]\\d{9}')])
    },{
      validator: this.customValidator.MatchPassword('formPassword', 'formConfirm')
    });
  }
  get logforms() {
    return this.LoginForm.controls;
  }
  get regforms() {
    return this.RegisForm.controls;
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
  //Error Messages
  getRequiredMessage() {
    return 'กรุณากรอกข้อมูล';
  }
  getLengthError() {
    return 'รหัสผ่านต้องมีความยาวตั้งแต่ 8-16 ตัวอักษรขึ้นไป'
  }
  getUsernameLength() {
    return 'ต้องมีความยาวตั้งแต่ 5 ตัวอักษรขึ้นไป'
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

