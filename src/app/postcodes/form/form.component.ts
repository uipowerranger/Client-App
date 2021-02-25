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
import { environment } from "../../../environments/environment";
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
  advanceTable: CategoriesTable;
  categoryList: any[] = [];
  stateData: any;
  adminRole: string;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: CategoriesService,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Set the defaults
    this.action = data.action;
    this.adminRole = this.authService.currentUserValue.role;
    if (this.action === "edit") {
      this.dialogTitle = data.advanceTable.post_code;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = "New Record";
      this.advanceTable = new CategoriesTable({});
    }

    this.advanceTableForm = this.createContactForm();
    let url;
    if (this.authService.currentUserValue.role === "admin") {
      url = `${environment.apiUrl}/api/state`;
      this.http.get<any>(url).subscribe((res: any) => {
        return (this.categoryList = [
          { _id: "", state_name: "Select" },
          ...res.data,
        ]);
      });
    } else {
      url = `${environment.apiUrl}/api/state/details/${this.authService.currentUserValue.assign_state}`;
      this.http.get<any>(url).subscribe((res: any) => {
        return (this.categoryList = [
          { _id: "", state_name: "Select" },
          { ...res.data },
        ]);
      });
    }
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
      .get<any>(`${environment.apiUrl}/api/state`, {})
      .subscribe((res: any) => {
        let state = res.data.find((s) => {
          return s._id === this.advanceTableForm.get("state").value;
        });
        this.stateData = state;
        if (
          this.stateData &&
          Number(this.advanceTableForm.get("post_code").value) >=
            this.stateData.postcode_from &&
          Number(this.advanceTableForm.get("post_code").value) <=
            this.stateData.postcode_to
        ) {
          console.log("true");
        } else {
          this.advanceTableForm.controls.post_code.setErrors({
            incorrect: true,
            data: this.stateData,
          });
        }
        return [{ _id: "", state_name: "Select" }, ...res.data];
      });
  }
  postCode(e: any) {
    if (this.stateData) {
      if (
        Number(e.target.value) >= this.stateData.postcode_from &&
        Number(e.target.value) <= this.stateData.postcode_to
      ) {
        console.log("true");
      } else {
        this.advanceTableForm.controls.post_code.setErrors({
          incorrect: true,
          data: this.stateData,
        });
      }
    }
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      _id: [this.advanceTable._id],
      post_code: [this.advanceTable.post_code, [Validators.required]],
      state: [this.advanceTable.state, [Validators.required]],
      createdAt: [
        formatDate(this.advanceTable.createdAt, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      status: [this.advanceTable.status, [Validators.required]],
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
