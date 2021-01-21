import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/service/auth.service";
import { environment } from "src/environments/environment";
import { ProfileUser } from "./profile.model";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileData: ProfileUser;
  advanceTableForm: FormGroup;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileData = new ProfileUser({});
    this.advanceTableForm = this.createContactForm(this.profileData);
  }
  async ngOnInit() {
    this.http
      .post(<any>`${environment.apiUrl}/api/admin/getLoginUser`, {
        _id: this.authService.currentUserValue._id,
      })
      .subscribe((user: any) => {
        this.profileData = user.data.data[0];
        this.advanceTableForm = this.createContactForm(this.profileData);
      });
  }
  submit() {
    // emppty stuff
  }
  createContactForm(profileData): FormGroup {
    return this.fb.group({
      _id: [profileData._id, [Validators.required]],
      first_name: [profileData.first_name, [Validators.required]],
      last_name: [profileData.last_name, [Validators.required]],
      email_id: [profileData.email_id, [Validators.required]],
      phone_number: [profileData.phone_number, [Validators.required]],
      address: [profileData.address, [Validators.required]],
      city: [profileData.city, [Validators.required]],
      state: [profileData.state, [Validators.required]],
      post_code: [profileData.post_code, [Validators.required]],
      designation: [profileData.designation, [Validators.required]],
    });
  }
  public confirmAdd(): void {
    this.http
      .post(
        <any>`${environment.apiUrl}/api/admin/updateAdmin`,
        this.advanceTableForm.getRawValue()
      )
      .subscribe((res) => {
        if (res) {
          this.profileData = this.advanceTableForm.getRawValue();
          localStorage.setItem(
            "currentUser",
            JSON.stringify(this.advanceTableForm.getRawValue())
          );
          this.snackBar.open("Profile Updated Successfully...!!!", "", {
            duration: 2000,
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "snackbar-success",
          });
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        }
      });
  }
}
