import { VegboxService } from './../vegbox.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  addtoBox: any;
  vgname: string;
  vegsize: string;
  vegboxtotalprice: number;
  statedetails: any;
  state_name: string;

  vegbox = {
    "name": 'small',
    "state": '',
    "amount": 0
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
  statesList: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private vegboxsvc: VegboxService) {
    this.vegboxsvc.getState().subscribe((res: any) => {
      this.statesList = res.data;
    })
  }

  ngOnInit(): void {
    this.addtoBox = this.data;

    if (this.data != null) {
      this.vgname = this.addtoBox.box_name;
      this.vegboxtotalprice = this.addtoBox.total_amount;
      this.statedetails = this.addtoBox.state_id;
      this.statedetails = this.addtoBox.state_id;
      this.state_name = this.addtoBox.state_name;
    }



  }
  onSubmit() {
    localStorage.setItem('tot', (this.vegbox.amount).toString())
    this.showproducts = true;
    this.vgname = this.vegbox.name;
    this.vegboxtotalprice = this.vegbox.amount;
    this.statedetails = this.vegbox.state;
    this.refresh();
    this.vegboxsvc.getStateName(this.vegbox.state).subscribe((res: any) => {
      this.state_name = res.data.state_name;
      this.refresh();
    })
  }
  selectOption(value) {
    console.log(value)
  }
  stateOptionChange(value) {
    this.statedetails = this.vegbox.state;
    this.vegboxsvc.notifyOther({ refresh: true });
  }
  refresh() {
    this.vegboxsvc.notifyOther({ refresh: true });
  }
}
