import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GiftBoxTable } from "./giftbox-form.model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GiftboxService {
  constructor(private http: HttpClient) { }
  private readonly API_URL = "assets/data/advanceTable.json";
  public notify = new BehaviorSubject<any>('');
  notifyObservable$ = this.notify.asObservable();

  getAllProducts() {
    return this.http.get(`${environment.apiUrl}/api/products`)
  }
  getAllGiftboxes() {
    return this.http.get(`${environment.apiUrl}/api/giftbox`)
  }
  saveGiftBox(body) {
    let payload = {
      "items": body.items,
      "box_name": body.box_name,
      "total_amount": body.total_amount
    }
    return this.http.post(`${environment.apiUrl}/api/giftbox/create`, { items: body.items, box_name: body.box_name, total_amount: body.total_amount });
  }
  delteGiftBox(id) {
    return this.http.delete(`${environment.apiUrl}/api/giftbox/${id}`)
  }
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
}
