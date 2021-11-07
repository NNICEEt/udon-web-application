import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService
  ) {}
  public LoginForm!: FormGroup;
  username: string = '';
  password: String = '';

  ngOnInit(): void {
    //Validations Form
    this.LoginForm = this.fb.group({
      lUsername: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    });
  }
  get logforms() {
    return this.LoginForm.controls;
  }
  pressLogin() {
    console.log(this.username);
  }
  //Error Messages
  getRequiredMessage() {
    return 'กรุณากรอกข้อมูล';
  }
  getLengthError() {
    return 'รหัสผ่านต้องมีความยาวตั้งแต่ 8-16 ตัวอักษรขึ้นไป';
  }
  getUsernameLength() {
    return 'ต้องมีความยาวตั้งแต่ 5 ตัวอักษรขึ้นไป';
  }
}
