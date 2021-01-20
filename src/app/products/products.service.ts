import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ProductsTable } from "./products.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private readonly API_URL = "assets/data/advanceTable.json";
  dataChange: BehaviorSubject<ProductsTable[]> = new BehaviorSubject<
    ProductsTable[]
  >([]);
  categoryList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): ProductsTable[] {
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
      .get<any>(`${environment.apiUrl}/api/admin/product`)
      .subscribe(
        (res) => {
          this.dataChange.next(res.data.data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }
  // DEMO ONLY, you can find working methods below
  addAdvanceTable(advanceTable: ProductsTable): void {
    if (advanceTable._id === "") {
      this.httpClient
        .post<any>(`${environment.apiUrl}/api/admin/product/add`, advanceTable)
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
          `${environment.apiUrl}/api/admin/product/update`,
          advanceTable
        )
        .subscribe(
          (res) => {
            console.log(res);
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        );
    }
    this.dialogData = advanceTable;
  }
  updateAdvanceTable(advanceTable: ProductsTable): void {
    this.dialogData = advanceTable;
  }
  deleteAdvanceTable(id: number): void {
    this.httpClient
      .post<any>(`${environment.apiUrl}/api/admin/product/update`, {
        _id: id,
        is_active: 0,
      })
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
