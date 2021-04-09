import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class StockserviceService {

  constructor(private http: HttpClient) { }
  getStocks() {
    return this.http.get(`${environment.apiUrl}/api/stock/totalstocks`)
  }
  adjustStocks(body) {
    console.log("items", body)

    let items = [
      {
        "item_id": body.item_id,
        "quantity": body.quantity,
        "status": body.status
      }

    ]

    return this.http.post(`${environment.apiUrl}/api/stock/stock-adjustment`, { items })
  }

}
