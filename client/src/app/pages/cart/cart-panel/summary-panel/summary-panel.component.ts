import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent implements OnInit {

  constructor() { }
  @Input() totalPrice: number = 0;
  ngOnInit(): void {

  }

}
