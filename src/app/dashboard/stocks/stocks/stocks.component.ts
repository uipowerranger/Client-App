import { StockadjustmentComponent } from './../stockadjustment/stockadjustment.component';
import { StockserviceService } from './../stockservice.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.sass']
})
export class StocksComponent implements OnInit {
  totalstock = [];
  searchedKeyword: string;
  constructor(private stocksvc: StockserviceService, private dialogModel: MatDialog,) { }

  ngOnInit(): void {

    this.stocksvc.getStocks().subscribe((res: any) => {
      console.log("stocks:", res.data)
      this.totalstock = res.data;
    })
    this.stocksvc.notifyObservable$.subscribe(res => {
      if (res.refresh) {
        this.stocksvc.getStocks().subscribe((res: any) => {
          console.log("stocks:", res.data)
          this.totalstock = res.data;
        })
      }
    })
  }

  edit(s) {
    console.log(s)
    /** "item_id": "60656ee7ab52cc3b6c192d2a",
            "quantity": "2",
            "status": "2" */
  }
  openDialog(s): void {
    console.log("s", s)
    const dialogRef = this.dialogModel.open(StockadjustmentComponent, {
      width: '300px',
      disableClose: true,
      data: {
        "id": s._id,
      }
    });
  }

}
