import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MustMatch } from 'src/app/services/MustMatch';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}
  public LoginForm!: FormGroup;
  NotifyMessage: string = '';
  loginBody = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
    //Validations Form
    this.LoginForm = this.fb.group({
      lUsername: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
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
    this.service.login(this.loginBody).subscribe((res) => {
      // console.log(res);
      if (res.result) {
        localStorage.setItem('token', res.token.accessToken);
        this.router.navigate(['/home']);
      } else {
        this.NotifyMessage = 'Username หรือ Password ไม่ถูกต้อง';
      }
    });
  }
  //Error Messages
  getRequiredMessage() {
    return 'กรุณากรอกข้อมูล';
  }
  getLengthError() {
    return 'รหัสผ่านต้องมีความยาวตั้งแต่ 8-16 ตัวอักษรขึ้นไป';
  }
  getUsernameLength() {
    return 'ต้องมีความยาวตั้งแต่ 6 ตัวอักษรขึ้นไป';
  }
}
