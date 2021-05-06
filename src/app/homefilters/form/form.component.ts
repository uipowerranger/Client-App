

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { HomeFilterService } from "../homefilters.service";
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
      this.advanceTable = new CategoriesTable({});
    }
    this.advanceTableForm = this.createContactForm();
    let url;
    if (this.authService.currentUserValue.role === "admin") {
      url = `${environment.apiUrl}/api/state`;
      this.http.get<any>(url).subscribe((res: any) => {
        return (this.stateList = [
          { _id: "", state_name: "Select" },
          ...res.data,
        ]);
      });
    } else {
      url = `${environment.apiUrl}/api/state/details/${this.authService.currentUserValue.assign_state}`;
      this.http.get<any>(url).subscribe((res: any) => {
        return (this.stateList = [
          { _id: "", state_name: "Select" },
          { ...res.data },
        ]);
      });
    }
    this.http
      .get<any>(
        `${environment.apiUrl}/api/postcode/bystate/${this.advanceTable.state_details}`
      )
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
          (this.postcodeList = [{ _id: "", post_code: "Select" }, ...res.data])
      );
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      _id: [this.advanceTable._id],
      category_name: [this.advanceTable.category_name, [Validators.required]],
      order_number: [this.advanceTable.order_number, [Validators.required]],
      createdAt: [
        formatDate(this.advanceTable.createdAt, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      status: [this.advanceTable.status, [Validators.required]],
      state_details: [this.advanceTable.state_details, [Validators.required]],
      image: [this.advanceTable.image, [Validators.required]],
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
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          this.http
            .post(<any>`${environment.apiUrl}/api/admin/fileUpload`, {
              data: imgBase64Path,
            })
            .subscribe((res: any) => {
              console.log(res);
              if (res.status === 200) {
                this.advanceTableForm.patchValue({
                  image: res.data,
                });
              }
            });
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
    }
  }
}
