import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VegboxService {

  constructor(private http: HttpClient, private authService: AuthService) { }
  public notify = new BehaviorSubject<any>('');
  notifyObservable$ = this.notify.asObservable();

  getAllProducts() {
    // getAllProducts(id: any) {
    // return this.http.get(`${environment.apiUrl}/api/products/bystate/${id}`)
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
      "state_name": body.state_name
    };

    return this.http.post(`${environment.apiUrl}/api/giftbox/create`, payload);
  }
  delteGiftBox(id) {
    return this.http.delete(`${environment.apiUrl}/api/giftbox/${id}`)
  }
  public notifyOther(data: any) {
    if (data) {
      console.log("data:::", data)
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


  }
}
