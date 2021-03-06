import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MustMatch } from 'src/app/services/MustMatch';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from 'src/app/components/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-secure-box',
  templateUrl: './secure-box.component.html',
  styleUrls: ['./secure-box.component.scss'],
})
export class SecureBoxComponent implements OnInit {
  newPass: string = '';
  confirmPass: string = '';
  public secureForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.secureForm = this.fb.group(
      {
        formNew: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ]),
        formConfirm: new FormControl('', [Validators.required]),
      },
      {
        validator: MustMatch('formNew', 'formConfirm'),
      }
    );
  }
  get secureCt() {
    return this.secureForm.controls;
  }
  pressUpdate() {
    this.service.updatePassword(this.newPass).subscribe((res) => {
      this.dialog.open(ProfileDialogComponent);
    })
  }
  getLengthError() {
    return 'รหัสผ่านต้องมีความยาวตั้งแต่ 8-16 ตัวอักษรขึ้นไป';
  }
  misMatchError() {
    return 'รหัสผ่านไม่ตรงกัน';
  }
  getRequiredError() {
    return 'กรุณากรอกข้อมูล';
  }
}
