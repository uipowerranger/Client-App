import { GiftboxService } from './../giftbox.service';
import { GiftBoxModule } from './../giftbox.module';


import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
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
export class FormComponent {
  vgname: string;
  vegsize: string;
  vegbox = {
    "size": "small",
    "name": 'small'
  }
  vegboxname = new FormControl('', [
    Validators.required,
  ]);
  vegboxsize = new FormControl('', [
    Validators.required,
  ]);
  showproducts: boolean = false;

  onSubmit() {
    this.showproducts = true;
    this.vgname = this.vegbox.name;
    this.vegsize = this.vegbox.size;
  }
  selectOption(value) {
    console.log(value)
  }
}
