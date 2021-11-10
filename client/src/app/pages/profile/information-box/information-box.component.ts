import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-information-box',
  templateUrl: './information-box.component.html',
  styleUrls: ['./information-box.component.scss'],
})
export class InformationBoxComponent implements OnInit {
  //Assign
  title = 'fileUpload';
  images: any = null;
  imgUrl: string = '';
  myForm: FormGroup;
  public informationForm!: FormGroup;

  user: any = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: {
      mainAddress: '',
      district: '',
      province: '',
      postcode: '',
    },
  };

  constructor(
    private http: HttpClient,
    public fb: FormBuilder,
    private userService: UserService
  ) {
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
    });
  }

  ngOnInit(): void {
    this.informationForm = this.fb.group({
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
    });
    this.userService.getUserInfo().subscribe((res) => {
      this.user.firstname = res.firstname;
      this.user.lastname = res.lastname;
      this.user.email = res.email;
      this.user.phone = res.phone;
      this.user.address = res.address;
      this.imgUrl = res.photoURL;
    });
  }

  get informCt() {
    return this.informationForm.controls;
  }

  doSomethingOnError(event: any) {
    event.target.src = this.imgUrl;
  }
  //Upload User Profile Section
  selectImage(e: any) {
    const file = (e.target as HTMLInputElement).files![0];
    this.myForm.patchValue({
      img: file,
    });
    this.myForm.get('img')!.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imgUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.images = file;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);

    //upload image api
    this.userService.updateUser(this.user).subscribe();
    if (this.images) this.userService.uploadImg(formData).subscribe();
  }

  getRequiredError() {
    return 'กรุณากรอกข้อมูล';
  }
}
