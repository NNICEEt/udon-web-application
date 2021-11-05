import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faAddressBook, faUserSecret, faArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.scss']
})
export class ProfilePanelComponent implements OnInit {
  //Assign
  faAddressBook = faAddressBook;
  faUserSecret = faUserSecret;
  faArchive = faArchive;
  @Output() onSelect = new EventEmitter;
  
  constructor() { }

  ngOnInit(): void {
  }
  onSelectInform() {
    this.onSelect.emit(1);
  }
  onSelectSecure() {
    this.onSelect.emit(2);
  }
  onSelectOrder() {
    this.onSelect.emit(3);
  }

}
