import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { ProductsService } from "../products.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ProductsTable } from "../products.model";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.sass"],
})
export class FormComponent {
  action: string;
  dialogTitle: string;
  advanceTableForm: FormGroup;
  advanceTable: ProductsTable;
  categoryList: any[] = [];
  subCategoryList: any[] = [];
  stateList: any[] = [];
  postcodeList: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: ProductsService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.advanceTable.first_name;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = "New Record";
      this.advanceTable = new ProductsTable({});
    }
    this.advanceTableForm = this.createContactForm();

    this.http
      .get<any>(`${environment.apiUrl}/api/category`)
      .subscribe((res: any) => {
        return (this.categoryList = [
          { _id: "", category_name: "Select" },
          ...res.data,
        ]);
      });
    this.http
      .get<any>(`${environment.apiUrl}/api/state`)
      .subscribe((res: any) => {
        return (this.stateList = [
          { _id: "", state_name: "Select" },
          ...res.data,
        ]);
      });
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
  categorySelect() {
    this.http
      .get<any>(
        `${environment.apiUrl}/api/subcategory/${
          this.advanceTableForm.get("category_details").value
        }`
      )
      .subscribe(
        (res: any) =>
          (this.subCategoryList = [
            { _id: "", sub_category_name: "Select" },
            ...res.data,
          ])
      );
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
      first_name: [this.advanceTable.first_name, [Validators.required]],
      last_name: [this.advanceTable.last_name, [Validators.required]],
      email_id: [this.advanceTable.email_id, [Validators.required]],
      phone_number: [this.advanceTable.phone_number, [Validators.required]],
      address: [this.advanceTable.address, [Validators.required]],
      city: [this.advanceTable.city, [Validators.required]],
      state: [this.advanceTable.state, [Validators.required]],
      post_code: [this.advanceTable.post_code, [Validators.required]],
      designation: [this.advanceTable.designation, [Validators.required]],
      image: [this.advanceTable.image, [Validators.required]],
      assign_state: [this.advanceTable.assign_state, [Validators.required]],
      role: [this.advanceTable.role, [Validators.required]],
      password: [this.advanceTable.password, [Validators.required]],
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
