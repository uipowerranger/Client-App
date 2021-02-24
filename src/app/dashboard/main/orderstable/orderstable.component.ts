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
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.createContactForm();
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
      // this.totalOrders = res.data;
      this.totalOrders = res.data.length;
      console.log('Orders table', this.orderdata);
      this.totalAmount = res.data.map((a: any) => a.total_amount).reduce(function (a: any, b: any) {
        return a + b;
      });
    })
  }
  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}/api/order/get-admin`).subscribe((res: any) => {
      this.orderdata = res.data;
      // this.totalOrders = res.data;
      this.totalOrders = res.data.length;
      console.log('Orders table', this.orderdata);
      this.totalAmount = res.data.map((a: any) => a.total_amount).reduce(function (a: any, b: any) {
        return a + b;
      });
    })
  }


}
