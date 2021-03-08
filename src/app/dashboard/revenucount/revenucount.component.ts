import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders/orders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-revenucount',
  templateUrl: './revenucount.component.html',
  styleUrls: ['./revenucount.component.sass']
})
export class RevenucountComponent implements OnInit {

  totalRevenue: any = [];
  adminRole: any;
  assignState: any;
  stateAssigned: any;
  stateWidetotalRevenue;
  stateWidetotalRevenueData: any;
  loading: boolean = true;

  constructor(private orderssvc: OrdersService, private authService: AuthService, private httpClient: HttpClient) {
    this.adminRole = this.authService.currentUserValue.role;
    this.assignState = this.authService.currentUserValue.assign_state;
  }

  ngOnInit(): void {
    this.loading = true;

    this.httpClient
      .get(<any>`${environment.apiUrl}/api/state/details/${this.assignState}`)
      .subscribe((state: any) => {
        this.loading = false;
        this.stateAssigned = state.data.state_name;
        this.orderssvc.getOrders().subscribe((res: any) => {
          this.stateWidetotalRevenueData = res.data.filter(r => { return r.shipping_address.state === this.stateAssigned });
          this.totalRevenue = this.findTotal(res.data)
          this.stateWidetotalRevenue = this.findTotal(this.stateWidetotalRevenueData)


        })
      });

    console.log('StateWide Revenue', this.stateWidetotalRevenue)
  }
  findTotal(res) {
    return res.map(a => a.total_amount).reduce(function (a, b) {
      return a + b;
    });
  }
}
