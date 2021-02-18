import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders/orders.service';

@Component({
  selector: 'app-revenucount',
  templateUrl: './revenucount.component.html',
  styleUrls: ['./revenucount.component.sass']
})
export class RevenucountComponent implements OnInit {

  totalRevenue: any = [];

  constructor(private orderssvc: OrdersService) { }

  ngOnInit(): void {
    this.orderssvc.getOrders().subscribe((res: any) => {
      console.log('orders res', res.data)
      this.totalRevenue = res.data.map(a => a.total_amount).reduce(function (a, b) {
        return a + b;
      });
    })
  }
}
