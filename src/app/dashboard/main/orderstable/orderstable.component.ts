import { ProductsService } from './../../../add_users/products.service';

import { PipeTransform, Pipe } from '@angular/core';
import { AuthService } from './../../../core/service/auth.service';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { environment } from "src/environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: 'app-orderstable',
  templateUrl: './orderstable.component.html',
  styleUrls: ['./orderstable.component.sass']
})
export class OrderstableComponent implements OnInit {
  totalOrders: any;
  totalAmount = 0;
  orderdata: any;
  ordersTable: any;
  fromDate: any;
  todate: any;
  daterange: any = {}
  contactForm: FormGroup;
  adminRole: any;
  assignState: any;
  stateAssigned: any;
  stateInfo: any;
  statewide: any;
  statewideOrders: any;
  statewideamount: any;
  searchedKeyword: string;
  constructor(
    private snackBar: MatSnackBar, private http: HttpClient, private formBuilder: FormBuilder, private authService: AuthService, private prodsvc: ProductsService) {
    this.createContactForm();
    this.adminRole = this.authService.currentUserValue.role;
    this.assignState = this.authService.currentUserValue.assign_state;
  }

  createContactForm() {
    this.contactForm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      message: [''],
      startDate: [],
      endDate: []
    });
  }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  onSubmit() {
    const body = {
      "from_date": formatDate(this.contactForm.value.startDate, 'yyyy-MM-dd', 'en'),
      "to_date": formatDate(this.contactForm.value.endDate, 'yyyy-MM-dd', 'en')
    }
    this.http.post(`${environment.apiUrl}/api/order/filter-by-date`, body).subscribe((res: any) => {
      this.orderdata = res.data;
      console.log("Order Data.....", this.orderdata)
      // this.totalOrders = res.data;
      this.totalOrders = res.data.length;
      this.totalAmount = res.data.map((a: any) => a.total_amount).reduce(function (a: any, b: any) {
        return a + b;
      });
    })
  }
  ngOnInit(): void {
    this.loadorders();

  }

  loadorders() {
    this.http
      .get(<any>`${environment.apiUrl}/api/state/details/${this.assignState}`)
      .subscribe((state: any) => {
        console.log("Orderstable ", state);
        this.stateAssigned = state.data.state_name;
        this.stateInfo = state.data;
        this.http.get(`${environment.apiUrl}/api/order/get-admin`).subscribe((res: any) => {
          this.orderdata = res.data;
          this.totalOrders = res.data.length;
          this.totalAmount = res.data.map((a: any) => a.total_amount).reduce(function (a: any, b: any) {
            return a + b;
          });
          this.statewide = res.data.filter(u => {
            return (u.shipping_address.state.toLowerCase() === this.stateAssigned.toLowerCase())
          });
          this.statewideOrders = this.statewide.length;
          console.log("this.statewide", this.statewide);
          this.statewideamount = this.statewide.map((a: any) => a.total_amount).reduce(function (a: any, b: any) {
            return a + b;
          });
          console.log("this.statewideOrders", this.statewideOrders);
        })
      });

  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  updateOrder(o: any, status: number) {
    let order = {
      "order_id": o._id,
      "payment": o.total_amount ? 1 : 0,
      "order_completed": status
    }
    let order2 = {
      "order_id": o._id,
      "payment": o.total_amount,
      "order_completed": status
    }

    console.log("Order:", order)
    this.http
      .post<any>(`${environment.apiUrl}/api/order/update-status`, order).subscribe((res: any) => {
        if (res.status == 200) {
          this.showNotification(
            "snackbar-anger",
            res.message,
            "top",
            "right"
          );
          this.loadorders();
        }
      })
  }

}

@Pipe({
  name: 'callback',
  pure: false
})
export class CallbackPipe implements PipeTransform {
  transform(items: any[], callback: (item: any) => boolean): any {
    if (!items || !callback) {
      return items;
    }
    return items.filter(item => callback(item));
  }
}