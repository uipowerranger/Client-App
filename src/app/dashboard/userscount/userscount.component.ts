import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../core/service/auth.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userscount',
  templateUrl: './userscount.component.html',
  styleUrls: ['./userscount.component.sass']
})
export class UserscountComponent implements OnInit {

  usercount: number;
  adminRole: any;

  assignState: any;
  stateAssigned: any;
  statewide: any;
  statewideCount: any;
  loading: boolean = false
  constructor(private usersvc: UsersService, private authService: AuthService, private httpClient: HttpClient) {
    this.adminRole = this.authService.currentUserValue.role;
    this.assignState = this.authService.currentUserValue.assign_state;
  }

  ngOnInit(): void {
    this.loading = true;
    this.httpClient
      .get(<any>`${environment.apiUrl}/api/state/details/${this.assignState}`)
      .subscribe((state: any) => {
        this.stateAssigned = state.data.state_name;
        this.loading = false;
      });


    this.usersvc.getUsers().subscribe((res: any) => {
      this.statewide = res.data.filter(u => { return u.state === this.stateAssigned });
      this.statewideCount = this.statewide.length;
      this.usercount = res.data.length
    })
  }

}
