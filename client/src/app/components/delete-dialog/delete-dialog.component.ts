import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  header: string = '';
  content: string = '';
  buttonText: string = '';

  

  constructor() {}

  ngOnInit(): void {}

}
