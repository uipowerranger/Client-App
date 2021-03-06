import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ProductsTable } from "./products.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "../core/service/auth.service";

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
    this.httpClient.get<any>(`${environment.apiUrl}/api/products`).subscribe(
      (res) => {
        this.dataChange.next(res.data);
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
        .post<any>(`${environment.apiUrl}/api/products`, advanceTable)
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
        .put<any>(
          `${environment.apiUrl}/api/products/${advanceTable._id}`,
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
    }
    this.dialogData = advanceTable;
  }
  updateAdvanceTable(advanceTable: ProductsTable): void {
    this.dialogData = advanceTable;
  }
  deleteAdvanceTable(id: string, name: string, status: number): void {
    this.httpClient
      .put<any>(`${environment.apiUrl}/api/products/${id}`, {
        item_name: name,
        status: status,
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }
}
