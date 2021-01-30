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
  passwordTableForm: FormGroup;
  stateList: any[];
  assignedState: string;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileData = new ProfileUser({});
    this.advanceTableForm = this.createContactForm(this.profileData);
    this.passwordTableForm = this.createPasswordForm(this.profileData);
  }
  async ngOnInit() {
    this.http
      .get(
        <any>(
          `${environment.apiUrl}/api/admin/getbyid/${this.authService.currentUserValue._id}`
        )
      )
      .subscribe((user: any) => {
        this.profileData = user.data[0];
        this.assignedState = user.data[0].map_state.state_name;
        this.advanceTableForm = this.createContactForm(this.profileData);
        this.passwordTableForm = this.createPasswordForm(this.profileData);
      });

    this.http
      .get(<any>`${environment.apiUrl}/api/state`)
      .subscribe((state: any) => {
        return (this.stateList = [
          { _id: "", state_name: "Select" },
          ...state.data,
        ]);
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
      image: [profileData.image, [Validators.required]],
      assign_state: [profileData.assign_state, [Validators.required]],
      role: [profileData.role, [Validators.required]],
    });
  }
  createPasswordForm(profileData): FormGroup {
    return this.fb.group({
      _id: [profileData._id, [Validators.required]],
      password: ["", [Validators.required]],
      new_password: ["", [Validators.required]],
      cnew_password: ["", [Validators.required]],
    });
  }
  public passwordChange(): void {
    if (
      this.passwordTableForm.getRawValue().new_password !==
      this.passwordTableForm.getRawValue().cnew_password
    ) {
      this.passwordTableForm.controls.cnew_password.setErrors({
        incorrect: true,
      });
    } else {
      console.log(this.passwordTableForm.getRawValue());
      this.http
        .put(
          <any>(
            `${environment.apiUrl}/api/admin/update-password/${
              this.passwordTableForm.getRawValue()._id
            }`
          ),
          {
            old_password: this.passwordTableForm.getRawValue().password,
            new_password: this.passwordTableForm.getRawValue().new_password,
          }
        )
        .subscribe((res: any) => {
          if (res.status === 200) {
            this.snackBar.open("Password Updated Successfully...!!!", "", {
              duration: 2000,
              verticalPosition: "top",
              horizontalPosition: "right",
              panelClass: "snackbar-success",
            });
          }
        });
    }
  }
  public confirmAdd(): void {
    this.http
      .put(
        <any>(
          `${environment.apiUrl}/api/admin/update/${
            this.advanceTableForm.getRawValue()._id
          }`
        ),
        this.advanceTableForm.getRawValue()
      )
      .subscribe((res) => {
        if (res) {
          this.profileData = this.advanceTableForm.getRawValue();
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

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          this.http
            .post(<any>`${environment.apiUrl}/api/admin/fileUpload`, {
              data: imgBase64Path,
            })
            .subscribe((res: any) => {
              console.log(res);
              if (res.status === 200) {
                this.advanceTableForm.patchValue({
                  image: res.data,
                });
              }
            });
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
    }
  }
}
