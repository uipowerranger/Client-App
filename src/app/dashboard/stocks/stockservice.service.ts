import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StockserviceService {

  public notify = new BehaviorSubject<any>('');
  notifyObservable$ = this.notify.asObservable();

  constructor(private http: HttpClient) { }
  getStocks() {
    return this.http.get(`${environment.apiUrl}/api/stock/totalstocks`)
  }
  adjustStocks(body) {
    console.log("items", body)
    let items = [
      {
        "item_id": body[0].item_id,
        "quantity": body[0].quantity,
        "status": body[0].status
      }];

    return this.http.post(`${environment.apiUrl}/api/stock/stock-adjustment`, { items })
  }


  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

}
