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
  categoryList: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
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
    this.httpClient.post<any>(`${environment.apiUrl}/api/admin/subcategory/getAllSubCategory`,{}).subscribe(
      (res) => {
        this.dataChange.next(res.data.data.sub_category_list);
        this.categoryList.next(res.data.data.category_list);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getAllCategories(): void {
    this.httpClient.post<any>(`${environment.apiUrl}/api/admin/category/getAllCategory`,{}).subscribe(
      (res) => {
        console.log(res.data.data)
        this.categoryList.next(res.data.data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addAdvanceTable(advanceTable: CategoriesTable): void {
    console.log(advanceTable,'advanceTable')
    if(advanceTable._id === ""){
      this.httpClient.post<any>(`${environment.apiUrl}/api/admin/subcategory/add`, advanceTable).subscribe(
        (res) => {
          console.log(res)
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        }
      );
    } else {
      this.httpClient.post<any>(`${environment.apiUrl}/api/admin/category/updateCategory`, {
        _id: advanceTable._id,
        sub_category_name: advanceTable.sub_category_name,
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
