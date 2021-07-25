import { Data } from './data';

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { GiftboxService } from "./giftbox.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { GiftBoxTable } from "./giftbox-form.model";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormComponent } from "./form/form.component";
import { DeleteComponent } from "./delete/delete.component";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";
import { SelectionModel } from "@angular/cdk/collections";
import { AuthService } from "../core/service/auth.service";
import { environment } from "src/environments/environment";
import { MatTableDataSource } from "@angular/material/table";


// const ELEMENT_DATA: Data[] = [
// ];

@Component({
  selector: "app-homefilters",
  templateUrl: "./giftbox-form.component.html",
  styleUrls: ["./giftbox-form.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class GiftBoxComponent implements OnInit {
  displayedColumns: string[] = [
    "item_name",
    "image",
    "items_available",
    "price",
    "actions"
  ];
  dataSource: MatTableDataSource<Data>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private giftboxsvc: GiftboxService, public dialog: MatDialog) { }

  ngOnInit() {

    this.giftboxsvc.getAllProducts().subscribe((d: any) => {
      this.dataSource = new MatTableDataSource(d.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '100%',
      height: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  refresh() { }
}
