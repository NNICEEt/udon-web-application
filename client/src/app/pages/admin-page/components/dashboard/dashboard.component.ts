import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Book } from 'src/app/models/booktype';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashBooklist: Book[] = [];
  getLenght1!: number;
  getLenght2!: number;
  getLenght3!: number;
  bookTotal!: number;
  data: any;
  chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
  };

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.getBooks().subscribe((res) => {
      this.service.adminList = [...res];
      this.bookTotal = this.service.adminList.length;
      this.filterBook('การ์ตูน');
      this.filterBook('นิยาย');
      this.filterBook('วารสาร');
      this.data = {
        labels: ['การ์ตูน', 'นิยาย', 'วารสาร'],
        datasets: [
          {
            data: [this.getLenght1, this.getLenght2, this.getLenght3],
            backgroundColor: ['#ff4081', '#3f51b5', '#00ff90'],
            hoverBackgroundColor: ['#ff4081', '#3f51b5', '#00ff90'],
          },
        ],
      };
    });
  }
  filterBook(Cate: string) {
    this.dashBooklist = this.service.adminList.filter(
      (item) => Cate == item.categories
    );
    if (Cate == 'การ์ตูน') {
      this.getLenght1 = this.dashBooklist.length;
      console.log(Cate + ' : ' + this.getLenght1);
    } else if (Cate == 'นิยาย') {
      this.getLenght2 = this.dashBooklist.length;
      console.log(Cate + ' : ' + this.getLenght2);
    } else if (Cate == 'วารสาร') {
      this.getLenght3 = this.dashBooklist.length;
      console.log(Cate + ' : ' + this.getLenght3);
    }
  }
}
