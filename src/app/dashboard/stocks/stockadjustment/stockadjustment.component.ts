
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Inject } from '@angular/core';
import { StockserviceService } from '../stockservice.service';

@Component({
  selector: 'app-stockadjustment',
  templateUrl: './stockadjustment.component.html',
  styleUrls: ['./stockadjustment.component.sass']
})
export class StockadjustmentComponent implements OnInit {
  qty: number = 0;

  constructor(private stocksvc: StockserviceService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<StockadjustmentComponent>,) { }

  ngOnInit(): void {
    console.log(this.data)
  }
  onNoClick(status): void {
    console.log("Hai", this.qty);
    let items = [
      {
        "item_id": this.data._id,
        "quantity": this.qty,
        "status": status
      }

    ];
    this.stocksvc.adjustStocks({ items }).subscribe((res: any) => {
      console.log("Stock Adjustment", res)
    })
    this.dialogRef.close();
  }
}
