import { element } from 'protractor';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { GiftboxService } from '../giftbox.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormComponent } from "../form/form.component";
import { AnyNaptrRecord } from 'dns';




@Component({
  selector: 'app-giftboxcollection',
  templateUrl: './giftboxcollection.component.html',
  styleUrls: ['./giftboxcollection.component.sass']
})
export class GiftboxcollectionComponent implements OnInit {
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


  constructor(readonly snackBar: MatSnackBar, private giftboxsvc: GiftboxService, public dialog: MatDialog, formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      acceptTerms: ['', Validators.requiredTrue],
      status: ''
    });
  }
  searchTerm: string;
  @Input() name: string;
  @Input() size: number;

  ngOnInit() {
    this.getAllProducts();
    this.giftboxsvc.notifyObservable$.subscribe(res => {
      if (res.refresh) {
        this.getAllProducts();
      }
    })
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
  getAllProducts() {
    this.giftboxsvc.getAllGiftboxes().subscribe((d: any) => {
      this.giftboxCollection = d.data;
      console.log("total data:", this.giftboxCollection)
    });
  }
  refresh() {
    this.getAllProducts();
  }
  delete(_id) {
    console.log("In delete Method", _id)
    this.giftboxsvc.delteGiftBox(_id).subscribe((res: any) => {
      console.log("res", res)
      this.refresh()
    })
  }

  updateBox(parentObject, offername, items, isEditable) {
    let objIndex = parentObject.items.findIndex((obj => obj._id == items._id));
    console.log("objIndex:", parentObject.items[objIndex]);
    parentObject.items[objIndex].mandatefield = isEditable
    parentObject.items[objIndex].iseditable = false;
    parentObject.items[objIndex].offer = offername;
    console.log("updated", parentObject.items[objIndex])
    this.setValue(parentObject.items, parentObject.box_name, parentObject._id)

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
  up(parentObject, event, item) {
    console.log("ismandatory", item.mandatefield)
    console.log("iseditable", item.iseditable)
    item.iseditable = false;
    console.log("after saving", item);
    let isEditable = item.mandatefield;
    let offerdetails = event.target.offer.value.trim();
    this.updateBox(parentObject, offerdetails, item, isEditable)
  }
  deleteItem(totalItems: any, item) {
    totalItems.items.splice(item._id, 1)
    console.log(totalItems);
    this.setValue(totalItems.items, totalItems.box_name, totalItems._id)
  }
  ngOnDestroy() {












































    
  }
}
