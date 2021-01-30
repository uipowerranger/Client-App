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
    this.httpClient.get<any>(`${environment.apiUrl}/api/postcode`).subscribe(
      (res) => {
        this.dataChange.next(res.data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
  getAllCategories(): void {
    this.httpClient.get<any>(`${environment.apiUrl}/api/state`).subscribe(
      (res) => {
        this.categoryList.next(res.data);
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
        .post<any>(`${environment.apiUrl}/api/postcode`, advanceTable)
        .subscribe(
          (res) => {
            console.log(res);
          },
          (error: HttpErrorResponse) => {
            console.log(error.name + " " + error.message);
          }
        );
    } else {
      this.httpClient
        .put<any>(`${environment.apiUrl}/api/postcode/${advanceTable._id}`, {
          post_code: advanceTable.post_code,
          status: advanceTable.status,
          state: advanceTable.state,
        })
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
      .delete<any>(`${environment.apiUrl}/api/postcode/${id}`)
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
