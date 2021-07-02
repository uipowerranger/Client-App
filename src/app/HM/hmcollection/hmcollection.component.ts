import { HMService } from './../hm.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormComponent } from "../form/form.component";





@Component({
  selector: 'app-hmcollection',
  templateUrl: './hmcollection.component.html',
  styleUrls: ['./hmcollection.component.sass']
})
export class HmcollectionComponent implements OnInit {
  displayedColumns: string[] = [
    "box_name",
    "total_amount",
    "item_image"
  ];

  isChecked = false;
  formGroup: FormGroup;
  dataSource: MatTableDataSource<Data>;
  giftboxCollection: any = [];
  vegboxTempArray = []

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  vegitableBoxArray = [];
  _count: number = 0;
  totAmount: number = 0;
  enableselectButton: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  selectedMessage: any;
  subscription: any;
  giftboxdata: any = []
  constructor(readonly snackBar: MatSnackBar, private giftboxsvc: HMService, public dialog: MatDialog, formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      acceptTerms: ['', Validators.requiredTrue],
      status: ''
    });
  }
  searchTerm: string;
  @Input() name: string;
  @Input() size: number;

  ngOnInit() {

    this.giftboxsvc.sharedParam.subscribe(param => {
      this.vegitableBoxArray.push(param)
    });
    this.getAllProducts();
    this.giftboxsvc.notifyObservable$.subscribe(res => {
      if (res.refresh) {
        this.getAllProducts();
      }
    })

  }

  openDialog(id) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '30%',
      height: '20vh',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

    });
  }
  getAllProducts() {
    this.giftboxsvc.getAllGiftboxes().subscribe((d: any) => {
      this.giftboxCollection = d.data;
    });
  }
  refresh() {
    this.getAllProducts();
  }
  delete(_id) {
    this.giftboxsvc.delteGiftBox(_id).subscribe((res: any) => {
      this.refresh()
    })
  }

  updateBox(id, name) {
    console.log("update:::", id, name)
    this.giftboxsvc.updateFilter(id, name).subscribe((res: any) => {
      console.log("update", res);
      this.getAllProducts();
    })
  }

  setValue(element, name, id) {
    let vegbxObj = (({ _id, item_name, image, price, quantity }) => ({ _id, item_name, image, price, quantity }))(element)
    this.name = name;
    this.vegitableBoxArray = JSON.parse(JSON.stringify(element))
    this.totAmount = this.addPrice(this.vegitableBoxArray);
    this.save();
    this.delete(id);
  }

  calcSize(a) {
    let arrysize = a.length;
    return arrysize;
  }

  addPrice(arr) {
    let s = 0;
    if (arr.length == 0) {
      return 0;
    } else
      if (arr.length == 1) {
        return arr[0].price;
      } else
        if (arr.length > 1) {
          for (let i = 0; i < arr.length; i++) {
            console.log(arr[i].price)
            s = s + arr[i].price
          }
          return s;
        }
  }

  save() {
    let body = {
      items: this.vegitableBoxArray, total_amount: this.totAmount, box_name: this.name
    }
    this.giftboxsvc.saveGiftBox(body).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.opensnackbar("Updated Successfully");
          this.giftboxsvc.notifyOther({ refresh: true });
        } else if (res.status == 201) {
          this.opensnackbar(res.message);
        }
      }
    );
  }

  opensnackbar(messsage: string) {
    this.snackBar.open(messsage, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000
    });
  }

  getStyleForSelected(mandatefield) {
    return mandatefield ? '1px solid red' : '1px solid transparent'
  }

  makeMandotry(element) {
    element.mandatefield = !element.mandatefield;
  }



  deleteItem(totalItems: any, item) {
    let index = totalItems.items.findIndex(function (o) {
      return o._id === item._id;
    })
    totalItems.items.splice(index, 1)
    this.setValue(totalItems.items, totalItems.box_name, totalItems._id)
  }

  addItem(g: any) {
    this.setValue(g.iems, 'test', g._id)
  }
  ngOnDestroy() {

  }
}
