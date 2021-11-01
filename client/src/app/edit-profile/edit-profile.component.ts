import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { faAddressBook, faUserSecret, faArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  faAddressBook = faAddressBook;
  faUserSecret = faUserSecret;
  faArchive = faArchive;
  imgUrl = '../../assets/images/userpic.png';
  selectedFile: File = null as any;
  percent = 0;

  @Input() userdetail:boolean = true;
  @Input() secure:boolean = false;
  @Input() myorder:boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('https://barbtood/upload', fd, {
      reportProgress: true,
      observe: 'events'
    })
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total) {
          const total: number = event.total;
          this.percent = Math.round(100 * event.loaded / total);
      }
        console.log('Upload Progress: ' + this.percent + '%');
      } else if (event.type ===  HttpEventType.Response) {
        console.log(event);
      }
      console.log(event);
    });
  }
}
