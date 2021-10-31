import { Component, OnInit, Input } from '@angular/core';
import { faSearch, faShoppingCart, faBars  } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faBars = faBars;

  @Input() slogin:boolean = true;

  imgUrl = '../../assets/images/logo.png';


  constructor() { }


  ngOnInit(): void {
  }

  doSomethingOnError(event:any) {
    event.target.src = '../../assets/images/logo.png'

  }
  openLogin(){
    Swal.fire({
      imageUrl: '../../assets/images/logo.png',
      imageHeight: 90,
      html: `
      <input type="text" id="login"  class="swal2-input" placeholder="ชื่อผู้ใช้ (Username)">
      <input type="password" id="password" class="swal2-input" placeholder="รหัสผ่าน (Password)">`,
      confirmButtonText: 'เข้าสู่ระบบ',
      cancelButtonText: 'ยกเลิก',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#287ae0',
      cancelButtonColor: '#ff001a',

    }).then((result) => {
      Swal.fire(`
        Login: ${result.value.login}
        Password: ${result.value.password}
      `.trim())
        this.slogin =false;
    })
  }
  openSignup(){
    Swal.fire({
      imageUrl: '../../assets/images/logo.png',
      imageHeight: 90,
      html: `
      <input type="text" id="login"  class="swal2-input" placeholder="ชื่อผู้ใช้ (Username)">
      <input type="password" id="password" class="swal2-input" placeholder="รหัสผ่าน (Password)">
      <input type="password" id="password" class="swal2-input" placeholder="ยืนยันรหัสผ่าน (Confirm-Password)">
      <input type="password" id="password" class="swal2-input" placeholder="ยืนยันรหัสผ่าน (Confirm-Password)">
      <input type="password" id="password" class="swal2-input" placeholder="อีเมล (E-Mail)">
      <input type="password" id="password" class="swal2-input" placeholder="เบอร์โทรศัพท์ (Mobile no.)">`,
      confirmButtonText: 'ลงทะเบียน',
      cancelButtonText: 'ยกเลิก',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#287ae0',
      cancelButtonColor: '#ff001a',
    }).then((result) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 2400
      })
    })
  }

}
