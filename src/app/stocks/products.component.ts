import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class ProductsComponent implements OnInit {

  constructor(
  ) {

  }
  ngOnInit() {
  }
}
