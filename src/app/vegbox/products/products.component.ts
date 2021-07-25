import { VegboxService } from './../vegbox.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GiftboxService } from 'src/app/giftbox/giftbox.service';
import { Data } from 'src/app/HM/data';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    "item_name",
    "image",
    "items_available",
    "price",
    "actions"
  ];
  isChecked = false;
  formGroup: FormGroup;
  dataSource: MatTableDataSource<Data>;
  vegboxTempArray = []

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  vegitableBoxArray = [];
  _count: number = 0;
  totAmount: number = 0;
  enableselectButton: any;
  enableselectButtonForGiftBox: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  vegboxId: any;
  stateId: any;
  constructor(private vegboxsvc: VegboxService, public dialogRef: MatDialogRef<ProductsComponent>, readonly snackBar: MatSnackBar, private giftboxsvc: GiftboxService, public dialog: MatDialog, formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      addtoVegBox: ['', Validators.requiredTrue],
      status: ''
    });
  }

  @Input() name: string;
  @Input() size: number;
  @Input() addtoGB: any;
  @Input() parentObj: any;
  @Input() stateInfo: any;
  @Input() stateName: any;
  @Input() price: number;


  ngOnInit(): void {
    this.vegboxsvc.getAllProducts().subscribe((d: any) => {
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
  setValue(element, event) {


    let vegbxObj = (({ _id, item_name, image, price, quantity, mandatefield }) => ({ _id, item_name, image, price, quantity, mandatefield }))(element)

    if (element.status) {
      element.status = !element.status;
      this.vegitableBoxArray.push(
        {
          "mandatefield": false,
          "item_id": vegbxObj._id,
          "item_name": vegbxObj.item_name,
          "item_image": vegbxObj.image,
          "quantity": 1,
          "price": parseFloat(vegbxObj.price).toFixed(2),
          "amount": parseFloat(vegbxObj.price).toFixed(2),
          "isEditable": false,
          "offer": ""

        }
      );

      if (this.vegitableBoxArray.length) {
        this.enableselectButton = true;
      }
      else {
        this.enableselectButton = false;
      }

    } else {
      element.status = !element.status;
      for (var i = this.vegitableBoxArray.length - 1; i >= 0; i--) {
        if (this.vegitableBoxArray[i].item_id === element._id) {
          this.vegitableBoxArray.splice(i, 1);
        }
      }
      if (this.vegitableBoxArray.length) {
        this.enableselectButton = true;
      }
      else {
        this.enableselectButton = false;
      }

    }

    this.totAmount = this.addPrice(this.vegitableBoxArray);
    if (this.vegitableBoxArray.length > 0) {
      this.enableselectButtonForGiftBox = true;
    } else this.enableselectButtonForGiftBox = false;
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
            s = s + parseFloat(arr[i].price)
          }

          return s;
        }
  }
  refresh() { this.giftboxsvc.notifyOther({ refresh: true }); }
  save() {
    let tot: number = this.price;
    let stateId = this.stateInfo;
    let body = {
      items: this.vegitableBoxArray, total_amount: tot, box_name: this.name, state_id: stateId, state_name: this.stateName
    }


    this.giftboxsvc.saveGiftBox(body).subscribe(

      (res: any) => {
        if (res.status == 200) {
          this.vegboxId = res._id;
          this.opensnackbar(res.message);
          this.refresh();
          this.dialogRef.close();
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
  pushtoGiftBox() {
    let array;
    this.giftboxsvc.changeParam(this.vegitableBoxArray);
    array = this.vegitableBoxArray.concat(this.addtoGB.items)
    this.vegitableBoxArray = array;
    this.delete(this.addtoGB._id);
    this.save();
    this.dialogRef.close();

  }
  delete(_id) {
    this.giftboxsvc.delteGiftBox(_id).subscribe((res: any) => {
      this.refresh()
    })
  }
}
