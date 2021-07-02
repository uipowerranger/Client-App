import { filter } from 'rxjs/operators';


import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  Form,
} from "@angular/forms";
import { HMService } from '../hm.service';

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.sass"],
})
export class FormComponent implements OnInit {
  addtoBox: any;
  vgname: string;
  vegsize: string;
  vegbox = {
    "size": "small",
    "name": 'small'
  }
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<FormComponent>, private filtersvc: HMService) {
    console.log("Inside form component", data)
  }
  vegboxname = new FormControl('', [
    Validators.required,
  ]);
  vegboxsize = new FormControl('', [
    Validators.required,
  ]);
  showproducts: boolean = false;

  onSubmit() {
    let body = {

      "filter_name": this.vegbox.name

    }
    console.log(this.vegbox.name)
    this.filtersvc.saveGiftBox(body).subscribe((res: any) => {
      console.log(res);
      this.filtersvc.notifyOther({ refresh: true });
    })


    this.dialogRef.close()
  }
  selectOption(value) {
    console.log(value)
  }
  ngOnInit() {
    this.addtoBox = this.data;
  }
}
