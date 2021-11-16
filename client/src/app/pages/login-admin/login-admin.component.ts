import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  constructor(private service:AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  public LoginForm!: FormGroup;
  NotifyMessage: string = '';
  loginBody = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
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
    this.service.loginAdmin(this.loginBody).subscribe((res) => {
      // console.log(res);
      if (res.result) {
        localStorage.setItem('token', res.token.accessToken);
        this.router.navigate(['admin/page']);
      } else {
        this.NotifyMessage = 'Username หรือ Password ไม่ถูกต้อง';
      }
    });
  }
}
