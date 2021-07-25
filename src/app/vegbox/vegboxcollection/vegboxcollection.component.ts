import { VegboxService } from './../vegbox.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-vegboxcollection',
  templateUrl: './vegboxcollection.component.html',
  styleUrls: ['./vegboxcollection.component.sass']
})
export class VegboxcollectionComponent implements OnInit {
  vegboxCollection: any;

  // constructor(private vegbsvc: VegboxService) { }
  searchTerm: string;
  name: any;
  vegitableBoxArray: any;
  totAmount: any;
  price: number;
  stateInfo: any;
  stateName: any;
  vegboxId: any;
  dialogRef: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  ngOnInit(): void {
    this.getProducts();
    this.vegbsvc.notifyObservable$.subscribe(res => {
      if (res.refresh) {
        this.vegbsvc.getAllGiftboxes().subscribe((res: any) => {
          this.vegboxCollection = res.data;
        })
      }
    })
  }
  getProducts() {
    this.vegbsvc.getAllGiftboxes().subscribe((res: any) => {
      this.vegboxCollection = res.data;
    })
    this.vegbsvc.notifyObservable$.subscribe(res => {
      if (res.refresh) {

        this.vegbsvc.getAllGiftboxes().subscribe((res: any) => {
          this.vegboxCollection = res.data;
        })
      }
    })
  }
  searchTer: string;
  constructor(readonly snackBar: MatSnackBar, private vegbsvc: VegboxService, public dialog: MatDialog, formBuilder: FormBuilder) {
  }


  openDialog(id) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '100%',
      height: '90vh',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogWithoutId() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '100%',
      height: '90vh',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  refresh() {
    this.getProducts();
  }

  delete(v, _id) {
    this.vegbsvc.delteGiftBox(_id).subscribe((res: any) => {
      this.getProducts();
    })

  }


  deleteItem(totalItems: any, item) {


    let index = totalItems.items.findIndex(function (o) {
      return o.item_id === item.item_id;
    })

    totalItems.items.splice(index, 1)
    this.setValue(totalItems.items, totalItems.box_name, totalItems._id)
    this.stateInfo = totalItems.state_id;
    this.stateName = totalItems.state_name;
    this.price = totalItems.total_amount;

    if (totalItems.items.length >= 1) {
      this.save(totalItems)
      this.delete(totalItems, totalItems._id);
      this.refresh()
    } else {
      this.delete(totalItems, totalItems._id);
      this.refresh()
    }

  }

  getStyleForSelected(mandatefield) {
    return mandatefield ? '1px solid red' : '1px solid transparent'
  }

  updateBox(parentObject, offername, items, isEditable) {
    let objIndex = parentObject.items.findIndex((obj => obj._id == items._id));
    parentObject.items[objIndex].mandatefield = isEditable
    parentObject.items[objIndex].iseditable = false;
    parentObject.items[objIndex].offer = offername;
    this.setValue(parentObject.items, parentObject.box_name, parentObject._id)
    this.delete(parentObject, parentObject._id);
    this.save(parentObject);
    this.getProducts()

  }

  setValue(element, name, id) {
    let vegbxObj = (({ _id, item_name, image, price, quantity }) => ({ _id, item_name, image, price, quantity }))(element)
    this.name = name;
    this.vegitableBoxArray = JSON.parse(JSON.stringify(element))
    // this.save(element, name, id);
  }

  save(vegbox) {

    let tot: number = this.price;
    let stateId = this.stateInfo;
    let body = {
      items: vegbox.items,
      total_amount: vegbox.total_amount,
      box_name: vegbox.box_name,
      state_id: vegbox.state_id,
      state_name: vegbox.state_name
    }

    this.vegbsvc.saveGiftBox(body).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.getProducts();
          this.opensnackbar(res.message);
          this.delete(vegbox, vegbox._id);
          this.refresh()
          // this.dialogRef.close();
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
    this.getProducts()
  }
  up(parentObject, event, item) {
    this.stateInfo = parentObject.state_id;
    this.stateName = parentObject.state_name;
    this.price = parentObject.total_amount;

    item.iseditable = false;
    let isEditable = item.mandatefield;
    let offerdetails = event.target.offer.value.trim();
    this.updateBox(parentObject, offerdetails, item, isEditable);
  }
}
