import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { last, map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get getToken(): String {
    return localStorage.getItem("auth_token");
  }

  register(
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    password: string
  ) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/admin/register`, {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        email_id: email,
        password: password,
      })
      .pipe(
        map((user) => {
          if (user.status === 200) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user.data.data));
            this.currentUserSubject.next(user.data.data);
            return user.data.data;
          } else {
            return null;
          }
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/admin/login`, {
        email_id: username,
        password,
      })
      .pipe(
        map((user) => {
          if (user.status === 200) {
            return user.data;
          } else {
            return null;
          }
        })
      );
  }

  verifyOtp(email: string, otp: number) {
    return this.http
      .post<any>(`${environment.apiUrl}/api/admin/verify-otp`, {
        email_id: email,
        otp: otp,
      })
      .pipe(
        map((user) => {
          if (user.status === 200) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user.data));
            localStorage.setItem("auth_token", user.data.token);
            this.currentUserSubject.next(user.data);
            return user.data;
          } else {
            return null;
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    localStorage.removeItem("auth_token");
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
