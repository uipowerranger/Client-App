import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoriesTable } from './categories.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly API_URL = 'assets/data/advanceTable.json';
  dataChange: BehaviorSubject<CategoriesTable[]> = new BehaviorSubject<
    CategoriesTable[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): CategoriesTable[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAdvanceTables(): void {
    this.httpClient.post<any>(`${environment.apiUrl}/api/admin/category/getAllCategory`,{}).subscribe(
      (res) => {
        this.dataChange.next(res.data.data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addAdvanceTable(advanceTable: CategoriesTable): void {
    if(advanceTable._id === ""){
      this.httpClient.post<any>(`${environment.apiUrl}/api/admin/category/add`, advanceTable).subscribe(
        (res) => {
          //console.log(res)
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
    } else {
      this.httpClient.post<any>(`${environment.apiUrl}/api/admin/category/updateCategory`, {
        _id: advanceTable._id,
        category_name: advanceTable.category_name,
        is_active: advanceTable.is_active
      }).subscribe(
        (res) => {
          //console.log(res)
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
    }
    this.dialogData = advanceTable;
  }
  updateAdvanceTable(advanceTable: CategoriesTable): void {
    this.dialogData = advanceTable;
  }
  deleteAdvanceTable(id: number): void {
    this.httpClient.post<any>(`${environment.apiUrl}/api/admin/category/deleteCategory`, {
      id: id
    }).subscribe(
      (res) => {
        //console.log(res)
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
}
