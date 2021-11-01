import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { faAddressBook, faUserSecret, faArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  //Usaged Icon
  faAddressBook = faAddressBook;
  faUserSecret = faUserSecret;
  faArchive = faArchive;
  //Image URL
  imgUrl = '../../assets/images/userpic.png';
  //Change Page Boolean
  @Input() userdetail:boolean = true;
  @Input() secure:boolean = false;
  @Input() myorder:boolean = false;
  //Assign
  title = 'fileUpload';

  images: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  doSomethingOnError(event:any) {
    event.target.src = '../../assets/images/userpic.png'
  }
  //Change Page Section
  changePageDetail() {
    this.userdetail = true;
    this.secure = false;
    this.myorder = false;
  }
  changePageSecure() {
    this.userdetail = false;
    this.secure = true;
    this.myorder = false;
  }
  changePageOrder() {
    this.userdetail = false;
    this.secure = false;
    this.myorder = true;
  }
  //Upload User Profile Section
  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    //upload image api
    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
