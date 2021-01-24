import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-regadmin',
  templateUrl: './regadmin.component.html',
  styleUrls: ['./regadmin.component.sass']
})
export class RegadminComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  @ViewChild('reg') reg :NgForm
  constructor(  private snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.register(this.f.first_name.value, this.f.last_name.value, this.f.email.value, this.f.phone_number.value, this.f.password.value).subscribe(res => {
        if(res){
          if(res.email_id){
            // this.router.navigate(['/dashboard/main']);
            // this.refresh();
            this.showNotification(
              "snackbar-success",
              "Add Record Successfully...!!!",
              "top",
              "right"
            );
          //  this.reg.reset()
           this.loginForm.reset();
          }
        }
      })
    }
  }

}
