import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation.service'

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
  public informationForm!: FormGroup;
  //User Information Form
  fName:string= 'พีรยุทธ';
  lName:String= 'บางศรี';
  email:String= '';
  phoneno:String= '';
  main_address:String= '';
  district:String= '';
  province:String= '';
  postcode:String= '';

  constructor(private http: HttpClient, private fb: FormBuilder, private customValidator: CustomvalidationService) { }

  ngOnInit(): void {
    this.informationForm = this.fb.group ({
      formEmail: new FormControl('', [Validators.required, Validators.email]),
      formPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]\\d{9}')]),
      formAddress: new FormControl('', [Validators.required]),
      formDistrict: new FormControl('', [Validators.required]),
      formProvince: new FormControl('', [Validators.required]),
      formPostCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]\\d{4}')])
    },{
      validator: this.customValidator.MatchPassword('formDistrict', 'formProvince')
    });
  }
  get informCt() {
    return this.informationForm.controls;
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
    getRequiredError() {
      return 'กรุณากรอกข้อมูล'
    }
}
