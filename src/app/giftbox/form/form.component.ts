import { GiftboxService } from './../giftbox.service';
import { GiftBoxModule } from './../giftbox.module';


import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.sass"],
})
export class FormComponent implements OnInit {
  addtoBox: any;
  vgname: string;
  vegsize: string;
  vegboxtotalprice: number;
  statedetails: any;
  vegbox = {
    "size": "small",
    "name": 'small',
    "state": '',
    "amount": 0
  }
  statesList: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private giftboxsvc: GiftboxService) {
    this.giftboxsvc.getState().subscribe((res: any) => {
      this.statesList = res.data;
      console.log("states", res.data)
    })
    localStorage.setItem('stId', data)
  }
  vegboxname = new FormControl('', [
    Validators.required,
  ]);
  vegboxsize = new FormControl('', [
    Validators.required,
  ]);
  vegboxprice = new FormControl('', [
    Validators.required,
  ]);
  showproducts: boolean = false;

  onSubmit() {
    console.log("State::::", this.vegbox.state)
    localStorage.setItem('tot', (this.vegbox.amount).toString())
    this.showproducts = true;
    this.vgname = this.vegbox.name;
    this.vegboxtotalprice = this.vegbox.amount;
    this.statedetails = this.vegbox.state;
    this.refresh();
  }
  selectOption(value) {
    console.log(value)
  }
  stateOptionChange(value) {

    this.statedetails = this.vegbox.state;
    this.refresh();
  }
  ngOnInit() {
    this.addtoBox = this.data;
  }
  refresh() {
    this.giftboxsvc.notifyOther({ refresh: true });
  }
}
