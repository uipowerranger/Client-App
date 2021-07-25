import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "../core/service/auth.service";

@Injectable({
  providedIn: "root",
})
export class GiftboxService {
  constructor(private http: HttpClient, private authService: AuthService) { }
  private readonly API_URL = "assets/data/advanceTable.json";
  public notify = new BehaviorSubject<any>('');
  notifyObservable$ = this.notify.asObservable();




  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private paramSource = new BehaviorSubject(null);
  sharedParam = this.paramSource.asObservable();


  changeParam(param: any[]) {
    this.paramSource.next(param)
  }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

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
      "total_amount": body.total_amount,
      "state_id": body.state_id,
      "state_name": body.state_name,
    }
    return this.http.post(`${environment.apiUrl}/api/giftbox/create`, payload);
  }

  delteGiftBox(id) {
    return this.http.delete(`${environment.apiUrl}/api/giftbox/${id}`)
  }

  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }

  getState() {
    if (this.authService.currentUserValue.role === "admin") {
      return this.http.get(`${environment.apiUrl}/api/state`)
    } else {
      alert('Only super admins can create vegbox');
      return null;
    }

  }

  getStateName(id: any) {

    return this.http.get(`${environment.apiUrl}/api/state/details/${id}`)
    // http://localhost:4949/api/products/bystate/6025807870a7eb39357e5862

  }
}
