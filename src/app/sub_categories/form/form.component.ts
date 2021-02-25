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
    if (this.action === "edit") {
      this.dialogTitle = data.advanceTable.sub_category_name;
      this.advanceTable = data.advanceTable;
    } else {
      this.dialogTitle = "New Record";
      this.advanceTable = new CategoriesTable({});
    }

    this.advanceTableForm = this.createContactForm();
    this.http
      .get<any>(`${environment.apiUrl}/api/category`, {})
      .subscribe((res: any) => {
        const { role, assign_state } = this.authService.currentUserValue;
        let categoryData = res.data.filter((c) => {
          if (role === "admin") {
            return true;
          } else {
            return c.state_details === assign_state;
          }
        });
        return (this.categoryList = [
          { _id: "", category_name: "Select" },
          ...categoryData,
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
  createContactForm(): FormGroup {
    return this.fb.group({
      _id: [this.advanceTable._id],
      sub_category_name: [
        this.advanceTable.sub_category_name,
        [Validators.required],
      ],
      category: [this.advanceTable.category, [Validators.required]],
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
