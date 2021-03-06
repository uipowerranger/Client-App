
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HomeFilterService } from "./homefilters.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { HomeFilterTable } from "./homefilter-form.model";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormComponent } from "./form/form.component";
import { DeleteComponent } from "./delete/delete.component";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatMenu, MatMenuTrigger } from "@angular/material/menu";
import { SelectionModel } from "@angular/cdk/collections";
import { AuthService } from "../core/service/auth.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-homefilters",
  templateUrl: "./homeflter-form.component.html",
  styleUrls: ["./homeflter-form.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class HomeFiltersComponent implements OnInit {
  displayedColumns = [
    "filter_name"
  ];
  exampleDatabase: HomeFilterService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<HomeFilterTable>(true, []);
  id: number;
  advanceTable: HomeFilterTable | null;
  adminRole: string;
  assignState: string;
  stateAssigned: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public advanceTableService: HomeFilterService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.adminRole = this.authService.currentUserValue.role;
    this.assignState = this.authService.currentUserValue.assign_state;
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  ngOnInit() {
    this.httpClient
      .get(<any>`${environment.apiUrl}/api/filters`)
      .subscribe((state: any) => {
        console.log("Filters:", state);
        this.dataSource = state.data;
        this.stateAssigned = state.data.state_name;
        console.log("stateAssigned", this.stateAssigned);
      });
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        advanceTable: this.advanceTable,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.unshift(
          this.advanceTableService.getDialogData()
        );
        this.refresh();
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "top",
          "right"
        );
      }
    });
  }
  editCall(row) {
    this.id = row.id;
    alert("I am in Edit mode...")
    console.log("I am in edit call ", row)
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        advanceTable: row,
        action: "edit",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
        ] = this.advanceTableService.getDialogData();
        // And lastly refresh table
        this.refresh();
        this.showNotification(
          "black",
          "Edit Record Successfully...!!!",
          "top",
          "right"
        );
      }
      console.log("Updated:", result)
    });
  }
  deleteItem(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refresh();
        this.showNotification(
          "snackbar-danger",
          "Delete Record Successfully...!!!",
          "top",
          "right"
        );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refresh();
      this.selection = new SelectionModel<HomeFilterTable>(true, []);
    });
    this.showNotification(
      "snackbar-danger",
      totalSelect + " Record Delete Successfully...!!!",
      "top",
      "right"
    );
  }
  public loadData() {
    this.exampleDatabase = new HomeFilterService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, "keyup").subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // context menu
  onContextMenu(event: MouseEvent, item: HomeFilterTable) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
export class ExampleDataSource extends DataSource<HomeFilterTable> {
  _filterChange = new BehaviorSubject("");
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }
  filteredData: HomeFilterTable[] = [];
  renderedData: HomeFilterTable[] = [];
  constructor(
    public _exampleDatabase: HomeFilterService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<HomeFilterTable[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];
    this._exampleDatabase.getAllAdvanceTables();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((advanceTable: HomeFilterTable) => {
            const searchStr = advanceTable.filter_name.toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this._paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: HomeFilterTable[]): HomeFilterTable[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.filter_name, b.filter_name];
          break;
        case "filter_name":
          [propertyA, propertyB] = [a.filter_name, b.filter_name];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
