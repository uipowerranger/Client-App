

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { HomeFilterService } from "../homefilters.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { HomeFilterTable } from "../homefilter-form.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/core/service/auth.service";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.sass"],
})
export class FormComponent {
  action: string;
  dialogTitle: string;
  advanceTableForm: FormGroup;
  advanceTable: HomeFilterTable;
  stateList: any[];
  postcodeList: any[];
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: HomeFilterService,
    private fb: FormBuilder,
    public http: HttpClient,
    private authService: AuthService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.advanceTable.category_name;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = "New Record";
      this.advanceTable = new HomeFilterTable({});
    }
    this.advanceTableForm = this.createContactForm();
    let url;
    if (this.authService.currentUserValue.role === "admin") {
      url = `${environment.apiUrl}/api/state`;
      this.http.get<any>(url).subscribe((res: any) => {
        return (this.stateList = [
          { filter_name: "" },
          ...res.data,
        ]);
      });
    } else {
      url = `${environment.apiUrl}/api/state/details/${this.authService.currentUserValue.assign_state}`;
      this.http.get<any>(url).subscribe((res: any) => {
        return (this.stateList = [
          { filter_name: "" },
          { ...res.data },
        ]);
      });
    }
  }
  formControl = new FormControl("", [
    Validators.required,
  ]);
  get f() {
    return this.advanceTableForm.controls;
  }
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
        ? "Not a valid email"
        : "";
  }
  stateSelect() {
    this.advanceTableForm.patchValue({
      post_code_details: "",
    });
    this.http
      .get<any>(
        `${environment.apiUrl}/api/postcode/bystate/${this.advanceTableForm.get("state_details").value
        }`
      )
      .subscribe(
        (res: any) =>
          (this.postcodeList = [{ filter_name: "" }, ...res.data])
      );
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      filter_name: [this.advanceTable.filter_name],

    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.advanceTableService.addAdvanceTable(
      this.advanceTableForm.getRawValue()
    );
  }

}
