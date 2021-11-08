import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MustMatch } from 'src/app/services/MustMatch';

@Component({
  selector: 'app-regist-page',
  templateUrl: './regist-page.component.html',
  styleUrls: ['./regist-page.component.scss']
})
export class RegistPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) {}
  public RegisForm!: FormGroup;
  username:string = '';
  password:String = '';
  fName:string= '';
  lName:String= '';
  datebirth!:Date;
  email:String= '';
  phoneno:String= '';

  ngOnInit(): void {
    this.RegisForm = this.fb.group ({
      formUsername: new FormControl('', [Validators.required, Validators.minLength(5)]),
      formPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      formConfirm: new FormControl(''),
      formfName: new FormControl('', [Validators.required]),
      formlName: new FormControl('', [Validators.required]),
      formDateBirth: new FormControl('', [Validators.required]),
      formEmail: new FormControl('', [Validators.required, Validators.email]),
      formPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]\\d{9}')])
    },{
      validator: MustMatch('formPassword', 'formConfirm')
    });
  }
  get regforms() {
    return this.RegisForm.controls;
  }
  pressLogin() {
    console.log(this.datebirth);
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
