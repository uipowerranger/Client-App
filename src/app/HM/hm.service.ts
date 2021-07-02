
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HMService {
  constructor(private http: HttpClient) { }
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
    return this.http.get(`${environment.apiUrl}/api/filters`)
  }
  saveGiftBox(body) {
    
    return this.http.post(`${environment.apiUrl}/api/filters/create`, body);
  }
  updateFilter(id, name) {
    let body = {
      "filter_name": name
    }
    return this.http.put(`${environment.apiUrl}/api/filters/${id}`, body);
  }
  delteGiftBox(id) {
    console.log("from delete method", id)
    return this.http.delete(`${environment.apiUrl}/api/filters/${id}`)
  }
  public notifyOther(data: any) {
    if (data) {
      this.notify.next(data);
    }
  }
}
