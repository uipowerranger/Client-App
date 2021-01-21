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
      .post<any>(`${environment.apiUrl}/api/admin/category/getAllCategory`, {})
      .subscribe((res: any) => {
        return (this.categoryList = [
          { _id: "", category_name: "Select" },
          ...res.data.data,
        ]);
      });
    this.http
      .post<any>(
        `${environment.apiUrl}/api/admin/subcategory/getAllSubCategorybyCategory`,
        { category: this.advanceTable.category_details }
      )
      .subscribe((res: any) => (this.subCategoryList = res.data.data));
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
      .post<any>(
        `${environment.apiUrl}/api/admin/subcategory/getAllSubCategorybyCategory`,
        { category: this.advanceTableForm.get("category_details").value }
      )
      .subscribe((res: any) => (this.subCategoryList = res.data.data));
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      _id: [this.advanceTable._id],
      item_name: [this.advanceTable.item_name, [Validators.required]],
      category_details: [
        this.advanceTable.category_details,
        [Validators.required],
      ],
      created_at: [
        formatDate(this.advanceTable.created_at, "yyyy-MM-dd", "en"),
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
      is_active: [this.advanceTable.is_active],
      deal_details: [this.advanceTable.deal_details],
      has_deal: [this.advanceTable.has_deal],
      has_offer: [this.advanceTable.has_offer],
      home_page_display: [
        this.advanceTable.home_page_display,
        [Validators.required],
      ],
      item_image: [this.advanceTable.item_image],
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
}
