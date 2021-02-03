import { ProductsService } from "./../products.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.sass"],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tableService: ProductsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    let status = this.data.status === true ? 0 : 1;
    this.tableService.deleteAdvanceTable(
      this.data._id,
      this.data.first_name,
      this.data.phone_number,
      status
    );
  }
}
