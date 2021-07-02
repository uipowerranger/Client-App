import { HMService } from './hm.service';
import { Data } from './data';

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormComponent } from "./form/form.component";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";

import { MatTableDataSource } from "@angular/material/table";


@Component({
  selector: "app-homefilters",
  templateUrl: "./hm-form.component.html",
  styleUrls: ["./hm-form.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class HMComponent implements OnInit {
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

  constructor(private giftboxsvc: HMService, public dialog: MatDialog) { }

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
      console.log(`Dialog result: ${result}`);
    });
  }
  refresh() { }
}
