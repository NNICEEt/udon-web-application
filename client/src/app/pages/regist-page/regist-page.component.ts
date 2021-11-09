import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/services/MustMatch';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-regist-page',
  templateUrl: './regist-page.component.html',
  styleUrls: ['./regist-page.component.scss'],
})
export class RegistPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}
  public RegisForm!: FormGroup;
  NotifyMessage: string = '* กรุณากรอกข้อมูลที่จำเป็น';
  registerBody = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    birthday: '',
  };

  ngOnInit(): void {
    this.RegisForm = this.fb.group(
      {
        formUsername: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        formPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ]),
        formConfirm: new FormControl(''),
        formfName: new FormControl('', [Validators.required]),
        formlName: new FormControl('', [Validators.required]),
        formDateBirth: new FormControl('', [Validators.required]),
        formEmail: new FormControl('', [Validators.required, Validators.email]),
        formPhone: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]\\d{9}'),
        ]),
      },
      {
        validator: MustMatch('formPassword', 'formConfirm'),
      }
    );
  }
  get regforms() {
    return this.RegisForm.controls;
  }

  async pressSignup() {
    this.service.register(this.registerBody).subscribe((res) => {
      if (res.result) {
        this.router.navigate(['/home']);
      } else {
        const errors = res.errors;
        if (errors.username !== '') {
          // notify (username)
          this.NotifyMessage = 'Username นี้ถูกใช้ไปแล้ว กรุณาลองใหม่อีกครั้ง';
        } else if (errors.email !== '') {
          //notify (email)
          this.NotifyMessage = 'E-mail นี้ถูกใช้ไปแล้ว กรุณาลองใหม่อีกครั้ง';
        } else {
          //notify (phone)
          this.NotifyMessage = 'เบอร์โทรศัพท์ นี้ถูกใช้ไปแล้ว กรุณาลองใหม่อีกครั้ง';
        }
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
    return 'ต้องมีความยาวตั้งแต่ 5 ตัวอักษรขึ้นไป';
  }
}
