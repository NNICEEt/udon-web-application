import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MustMatch } from 'src/app/services/MustMatch';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-information-box',
  templateUrl: './information-box.component.html',
  styleUrls: ['./information-box.component.scss'],
})
export class InformationBoxComponent implements OnInit {
  images: any = '';
  imgUrl = this.images || '../../assets/images/userpic.png';

  //Assign
  title = 'fileUpload';
  
  public informationForm!: FormGroup;

  //User Information Form
  firstname: string = 'พีรยุทธ';
  lastname: string = 'บางศรี';
  email: string = '';
  phone: string = '';
  mainAddress: string = '';
  district: string = '';
  province: string = '';
  postcode: string = '';
  photoURL: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.informationForm = this.fb.group(
      {
        formEmail: new FormControl('', [Validators.required, Validators.email]),
        formPhone: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]\\d{9}'),
        ]),
        formAddress: new FormControl('', [Validators.required]),
        formDistrict: new FormControl('', [Validators.required]),
        formProvince: new FormControl('', [Validators.required]),
        formPostCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]\\d{4}'),
        ]),
      },
      {
        validator: MustMatch('formDistrict', 'formProvince'),
      }
    );
    this.userService.getUserInfo().subscribe(res => {

      this.firstname = res.firstname;
      this.lastname = res.lastname;
      this.email = res.email;
      this.phone = res.phone;

      const address = res.address
      this.mainAddress = address.mainAddress;
      this.district = address.district;
      this.province = address.province;
      this.postcode = address.postcode;

      this.photoURL = res.photoURL;
    });
  }

  get informCt() {
    return this.informationForm.controls;
  }

  doSomethingOnError(event: any) {
    event.target.src = this.images || '../../assets/images/userpic.png';
  }

  //Upload User Profile Section
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
    console.log(this.imgUrl);
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
    console.log(this.images);

    //upload image api
    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  getRequiredError() {
    return 'กรุณากรอกข้อมูล';
  }
}
