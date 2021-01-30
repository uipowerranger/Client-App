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
      this.dialogTitle = data.advanceTable.item_name;
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
    this.http
      .get<any>(
        `${environment.apiUrl}/api/subcategory/${this.advanceTable.category_details}`
      )
      .subscribe(
        (res: any) =>
          (this.subCategoryList = [
            { _id: "", sub_category_name: "Select" },
            ...res.data,
          ])
      );
    this.http
      .get<any>(
        `${environment.apiUrl}/api/postcode/${this.advanceTable.state_details}`
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
      item_name: [this.advanceTable.item_name, [Validators.required]],
      category_details: [
        this.advanceTable.category_details,
        [Validators.required],
      ],
      createdAt: [
        formatDate(this.advanceTable.createdAt, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      offer_from_date: [
        formatDate(this.advanceTable.offer_from_date, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      offer_to_date: [
        formatDate(this.advanceTable.offer_to_date, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      status: [this.advanceTable.status],
      deal_details: [this.advanceTable.deal_details],
      has_deal: [this.advanceTable.has_deal ? "1" : "0"],
      has_offer: [this.advanceTable.has_offer ? "1" : "0"],
      home_page_display: [
        this.advanceTable.home_page_display,
        [Validators.required],
      ],
      image: [this.advanceTable.image, [Validators.required]],
      items_available: [
        this.advanceTable.items_available,
        [Validators.required],
      ],
      offer_details: [this.advanceTable.offer_details],
      post_code_details: [
        this.advanceTable.post_code_details,
        [Validators.required],
      ],
      price: [this.advanceTable.price],
      state_details: [this.advanceTable.state_details, [Validators.required]],
      sub_category_details: [
        this.advanceTable.sub_category_details,
        [Validators.required],
      ],
      weight: [this.advanceTable.weight],
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
