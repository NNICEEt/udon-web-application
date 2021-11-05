import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-information-box',
  templateUrl: './information-box.component.html',
  styleUrls: ['./information-box.component.scss']
})
export class InformationBoxComponent implements OnInit {
  imgUrl = '../../assets/images/userpic.png';
  //Assign
  title = 'fileUpload';
  images: any;
  form = new FormControl('', [Validators.required]);
  formPhone = new FormControl('', [Validators.required, Validators.pattern('[0-9]\\d{9}')]);
  formPostCode = new FormControl('', [Validators.required, Validators.pattern('[0-9]\\d{4}')]);
  formEmail = new FormControl('', [Validators.required, Validators.email]);

  //User Information Form
  fName:string= 'พีรยุทธ';
  lName:String= 'บางศรี';
  email:String= '';
  phoneno:String= '';
  main_address:String= '';
  district:String= '';
  province:String= '';
  postcode:String= '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  doSomethingOnError(event: any) {
    event.target.src = '../../assets/images/userpic.png';
  }
    //Upload User Profile Section
    selectImage(event: any) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.images = file;
      }
    }
  //Save Button
  ProfileonSave(
    value1: string,
    value2: string,
    value3: string,
    value4: string,
    value5: string,
    value6: string,
    value7: string,
    value8: string
  ) {
    const Users = {
      firstname: value1,
      lastname: value2,
      email: value3,
      phone: value4,
      address: {
        mainAddress: value5,
        district: value6,
        province: value7,
        postcode: value8,
      },
    };
    console.log(Users);
  }
    onSubmit() {
      const formData = new FormData();
      formData.append('file', this.images);
  
      //upload image api
      this.http.post<any>('http://localhost:3000/file', formData).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
    getErrorMessage() {
      if (this.form.hasError('required')) {
        return 'กรอกข้อมูลให้ครบถ้วน';
      }
      return '';
    }
    getError() {
      if (this.formEmail, this.formPhone, this.formPostCode.hasError('required')) {
        return 'ตรวจสอบรูปแบบของข้อมูล';
      }
      return '';
    }
}
