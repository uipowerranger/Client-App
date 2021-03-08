import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../core/service/auth.service';
import { OrdersService } from './../../orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ordercount',
  templateUrl: './ordercount.component.html',
  styleUrls: ['./ordercount.component.sass']
})
export class OrdercountComponent implements OnInit {
  totalOrders: any;
  adminRole: any;
  assignState: any;
  stateAssigned: any;
  stateInfo: any;
  statewide: any;
  statewideOrders: number;
  loading: boolean = false;
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
        this.stateInfo = state.data;
      });
    this.orderssvc.getOrders().subscribe((res: any) => {
      this.totalOrders = res.data.length;
      this.statewide = res.data.filter(u => {
        return (u.shipping_address.state === this.stateAssigned)
      });
      this.statewideOrders = this.statewide.length;
    })
  }


}
