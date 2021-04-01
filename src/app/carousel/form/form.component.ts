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
  advanceTable: ProductsTable;
  categoryList: any[] = [];
  subCategoryList: any[] = [];
  stateList: any[] = [];
  postcodeList: any[] = [];
  userRole: string;
  filterList: any[] = [
    "None",
    "Best Deal",
    "Deal of the Day",
    "Upto 60% off",
    "Organic",
    "Healthy Diet",
    "Everyday essentials",
    "Best deals in Oils",
    "Hot Deal in Honey",
    "Great offer in Dryfruits",
    "Best Sellers in Beauty",
    "Miscellaneous",
  ];
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public advanceTableService: ProductsService,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = "Edit Record";
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = "New Record";
      this.advanceTable = new ProductsTable({});
    }
    console.log(this.advanceTable);
    this.userRole = this.authService.currentUserValue.role;

    this.advanceTableForm = this.createContactForm();
    this.http
      .get<any>(`${environment.apiUrl}/api/category`)
      .subscribe((res: any) => {
        return (this.categoryList = [
          { _id: "", category_name: "Select" },
          ...res.data,
        ]);
      });
    let url: any;
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
        `${environment.apiUrl}/api/subcategory/bycategory/${
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
        `${environment.apiUrl}/api/postcode/bystate/${
          this.advanceTableForm.get("state_details").value
        }`
      )
      .subscribe(
        (res: any) =>
          (this.postcodeList = [{ _id: "", post_code: "Select" }, ...res.data])
      );
  }
  dealClick(e: any) {
    this.advanceTableForm.patchValue({
      has_offer: e.value == 1 ? "0" : "1",
    });
  }
  offerClick(e: any) {
    this.advanceTableForm.patchValue({
      has_deal: e.value == 1 ? "0" : "1",
    });
  }
  PriceChange(e: any) {
    let offer = this.advanceTableForm.get("offer_details").value;
    let actualPrice = this.advanceTableForm.get("actualPrice").value;
    if (!isNaN(offer) && !isNaN(actualPrice)) {
      let offerPrice = actualPrice * (offer / 100);
      this.advanceTableForm.patchValue({
        price: Number(actualPrice) - Number(offerPrice),
      });
    }
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      _id: [this.advanceTable._id],
      category: [this.advanceTable.category, [Validators.required]],
      createdAt: [
        formatDate(this.advanceTable.createdAt, "yyyy-MM-dd", "en"),
        [Validators.required],
      ],
      status: [this.advanceTable.status],
      image: [this.advanceTable.image, [Validators.required]],
      state: [this.advanceTable.state, [Validators.required]],
      description: [this.advanceTable.description],
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
