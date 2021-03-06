import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CategoriesTable } from "./categories.model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private readonly API_URL = "assets/data/advanceTable.json";
  dataChange: BehaviorSubject<CategoriesTable[]> = new BehaviorSubject<
    CategoriesTable[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) { }
  get data(): CategoriesTable[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAdvanceTables(): void {
    this.httpClient.get<any>(`${environment.apiUrl}/api/category`).subscribe(
      (res) => {
        this.dataChange.next(res.data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message, error);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addAdvanceTable(advanceTable: CategoriesTable): void {
    if (advanceTable._id === "") {
      this.httpClient
        .post<any>(`${environment.apiUrl}/api/category`, advanceTable)
        .subscribe(
          (res) => {
            //console.log(res)
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        );
    } else {
      this.httpClient
        .put<any>(`${environment.apiUrl}/api/category/${advanceTable._id}`, {
          category_name: advanceTable.category_name,
          state_details: advanceTable.state_details,
          post_code_details: advanceTable.post_code_details,
          status: advanceTable.status,
          image: advanceTable.image,
          order_number: advanceTable.order_number
        })
        .subscribe(
          (res) => {
            console.log("Categories:", res);
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
      .delete<any>(`${environment.apiUrl}/api/category/${id}`)
      .subscribe(
        (res) => {
          //console.log(res);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }
}
