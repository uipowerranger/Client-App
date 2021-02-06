import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { CategoriesService } from "../categories.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { CategoriesTable } from "../categories.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.sass"],
})
export class FormComponent {
  action: string;
  dialogTitle: string;
  advanceTableForm: FormGroup;
  advanceTable: CategoriesTable;
  stateList: any[];
  postcodeList: any[];
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: CategoriesService,
    private fb: FormBuilder,
    public http: HttpClient
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.advanceTable.category_name;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = "New Record";
      this.advanceTable = new CategoriesTable({});
    }
    this.advanceTableForm = this.createContactForm();
    this.http
      .get<any>(`${environment.apiUrl}/api/state`)
      .subscribe((res: any) => {
        return (this.stateList = [
          { _id: "", state_name: "Select" },
          ...res.data,
        ]);
      });
    this.http
      .get<any>(`${environment.apiUrl}/api/postcode/${this.advanceTable._id}`)
      .subscribe(
        (res: any) =>
          (this.postcodeList = [{ _id: "", post_code: "Select" }, ...res.data])
      );
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
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
    this.http
      .get<any>(
        `${environment.apiUrl}/api/postcode/${
          this.advanceTableForm.get("state_details").value
        }`
      )
      .subscribe(
        (res: any) =>
          (this.postcodeList = [{ _id: "", post_code: "Select" }, ...res.data])
      );
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      _id: [this.advanceTable._id],
      category_name: [this.advanceTable.category_name, [Validators.required]],
      createdAt: [
        formatDate(this.advanceTable.createdAt, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      status: [this.advanceTable.status, [Validators.required]],
      state_details: [this.advanceTable.state_details, [Validators.required]],
      post_code_details: [
        this.advanceTable.post_code_details,
        [Validators.required],
      ],
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
