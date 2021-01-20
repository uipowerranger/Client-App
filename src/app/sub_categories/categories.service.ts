import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CategoriesTable } from "./categories.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private readonly API_URL = "assets/data/advanceTable.json";
  dataChange: BehaviorSubject<CategoriesTable[]> = new BehaviorSubject<
    CategoriesTable[]
  >([]);
  categoryList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): CategoriesTable[] {
    return this.dataChange.value;
  }
  get categorydata(): any[] {
    return this.categoryList.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAdvanceTables(): void {
    this.httpClient
      .post<any>(
        `${environment.apiUrl}/api/admin/subcategory/getAllSubCategory`,
        {}
      )
      .subscribe(
        (res) => {
          this.dataChange.next(res.data.data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }
  getAllCategories(): void {
    this.httpClient
      .post<any>(`${environment.apiUrl}/api/admin/category/getAllCategory`, {})
      .subscribe(
        (res) => {
          this.categoryList.next(res.data.data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }
  // DEMO ONLY, you can find working methods below
  addAdvanceTable(advanceTable: CategoriesTable): void {
    if (advanceTable._id === "") {
      this.httpClient
        .post<any>(
          `${environment.apiUrl}/api/admin/subcategory/add`,
          advanceTable
        )
        .subscribe(
          (res) => {
            //console.log(res);
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        );
    } else {
      this.httpClient
        .post<any>(
          `${environment.apiUrl}/api/admin/subcategory/updateSubCategory`,
          {
            _id: advanceTable._id,
            sub_category_name: advanceTable.sub_category_name,
            is_active: advanceTable.is_active,
            category_details: advanceTable.category_details,
          }
        )
        .subscribe(
          (res) => {
            //console.log(res);
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        );
    }
    this.dialogData = advanceTable;
  }
  updateAdvanceTable(advanceTable: CategoriesTable): void {
    this.dialogData = advanceTable;
  }
  deleteAdvanceTable(id: number): void {
    this.httpClient
      .post<any>(
        `${environment.apiUrl}/api/admin/subcategory/deleteSubCategory`,
        {
          id: id,
        }
      )
      .subscribe(
        (res) => {
          //console.log(res)
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }
}
