import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Book } from 'src/app/models/booktype';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'admin-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  category:string [] = ['นิยาย', 'การ์ตูน', 'วารสาร']

  myControl = new FormControl();

  title = 'fileUpload';
  images: any = null;
  defaultImgUrl: string = '../../../../../assets/images/no_image.png'
  imgUrl: string = '';
  myForm: FormGroup;
  public insertBookForm!: FormGroup;

  bookBody: any = {
    title: '',
    description: '',
    image: '',
    categories: '',
    price: 0
  };

  constructor(
    private http: HttpClient,
    public fb: FormBuilder,
    private productService: ProductService
  ) {
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
    });
  }

  ngOnInit(): void {

    this.insertBookForm = this.fb.group({
      bookTitle: new FormControl('', [Validators.required]),
      bookDesc: new FormControl('', [Validators.required]),
      bookCategory: new FormControl('', [Validators.required]),
      bookPrice: new FormControl('', [Validators.required])
    });
  }

  get bookCt() {
    return this.insertBookForm.controls;
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
    this.productService.uploadImg(formData).subscribe((res) => {
      this.bookBody.image = res.image;
      this.productService.addBook(this.bookBody).subscribe();
    });
  }

  getRequiredError() {
    return 'กรุณากรอกข้อมูล';
  }



}
