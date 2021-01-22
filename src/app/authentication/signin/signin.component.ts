import { AuthService } from "src/app/core/service/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = "";
  showLoginTab: boolean = true;
  hide = true;
  userId: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["admin@gmail.com", Validators.required],
      password: ["admin123", Validators.required],
      otp: [""],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  submit() {}
  onSubmit() {
    this.submitted = true;
    this.error = "";
    if (
      this.loginForm.controls.username.errors ||
      this.loginForm.controls.password.errors
    ) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.authService
        .login(this.f.username.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res) {
              this.showLoginTab = false;
              this.userId = res._id;
            } else {
              this.error = "Invalid Login";
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
          }
        );
    }
  }
  goBack() {
    this.submitted = false;
    this.error = "";
    this.showLoginTab = true;
  }
  verifyOtp() {
    this.submitted = true;
    this.error = "";
    if (this.loginForm.controls.otp.value === "") {
      this.error = "Enter OTP!";
      return;
    } else {
      this.authService.verifyOtp(this.userId, this.f.otp.value).subscribe(
        (res) => {
          if (res) {
            this.showLoginTab = false;
            const email_id = this.authService.currentUserValue.email_id;
            if (email_id) {
              this.router.navigate(["/dashboard/main"]);
            }
          } else {
            this.error = "Invalid OTP";
          }
        },
        (error) => {
          this.error = error;
          this.submitted = false;
        }
      );
    }
  }
}
