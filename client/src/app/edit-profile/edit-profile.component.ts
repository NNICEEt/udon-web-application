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

  @Input() userdetail:boolean = true;
  @Input() secure:boolean = false;
  @Input() myorder:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  doSomethingOnError(event:any) {
    event.target.src = '../../assets/images/userpic.png'

  }

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
}
