import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service'

@Component({
  selector: 'app-secure-box',
  templateUrl: './secure-box.component.html',
  styleUrls: ['./secure-box.component.scss']
})
export class SecureBoxComponent implements OnInit {
  old_pass:String ='';
  new_pass:String ='';
  confirm_pass:String = '';
  public secureForm!: FormGroup;
  constructor(private fb: FormBuilder, private customValidator: CustomvalidationService) { }

  ngOnInit(): void {
    this.secureForm = this.fb.group ({
      formOld: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      formNew: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      formConfirm: new FormControl('', [Validators.required])
    },{
      validator: this.customValidator.MatchPassword('formNew', 'formConfirm')
    });
  }
  get secureCt() {
    return this.secureForm.controls;
  }
  getLengthError() {
    return 'รหัสผ่านต้องมีความยาวตั้งแต่ 8-16 ตัวอักษรขึ้นไป'
  }
  misMatchError() {
    return 'รหัสผ่านไม่ตรงกัน'
  }
  getRequiredError() {
    return 'กรุณากรอกข้อมูล'
  }
}

