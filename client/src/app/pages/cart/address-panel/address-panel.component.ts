import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-address-panel',
  templateUrl: './address-panel.component.html',
  styleUrls: ['./address-panel.component.scss']
})
export class AddressPanelComponent implements OnInit {
  userAddress: string = '';
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUserInfo().subscribe(res => {
      const address = res.address
      this.userAddress = `${address.mainAddress} ${address.district} ${address.province} ${address.postcode}`;
    });
  }

}
