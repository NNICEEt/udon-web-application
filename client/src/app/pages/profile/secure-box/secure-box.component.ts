import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-secure-box',
  templateUrl: './secure-box.component.html',
  styleUrls: ['./secure-box.component.scss']
})
export class SecureBoxComponent implements OnInit {
  formOldPassword = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  formNewPassword = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
  formConfirmPass = new FormControl('', [Validators.required]);
  old_pass:String ='';
  new_pass:String ='';
  confirm_pass:String = '';
  constructor() { }

  ngOnInit(): void {
  }
  getErrorMessage() {
    if (this.formOldPassword, this.formNewPassword.hasError('required')) {
      return 'กรอกข้อมูลให้ครบถ้วน';
    }
    return '';
  }
  getLengthError() {
    return 'รหัสผ่านต้องมีความยาวตั้งแต่ 8-16 ตัวอักษรขึ้นไป'
  }

}

