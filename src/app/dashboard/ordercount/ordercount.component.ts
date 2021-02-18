import { OrdersService } from './../../orders/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordercount',
  templateUrl: './ordercount.component.html',
  styleUrls: ['./ordercount.component.sass']
})
export class OrdercountComponent implements OnInit {
  totalOrders: any;

  constructor(private orderssvc: OrdersService) { }

  ngOnInit(): void {
    this.orderssvc.getOrders().subscribe((res: any) => {
      console.log('orders res', res)
      this.totalOrders = res.data.length;
    })
  }

}
