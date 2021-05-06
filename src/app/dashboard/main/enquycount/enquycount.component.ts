import { AuthService } from './../../../core/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-enquycount',
  templateUrl: './enquycount.component.html',
  styleUrls: ['./enquycount.component.sass']
})
export class EnquycountComponent implements OnInit {
  enquiries: any;
  enqcount: any;
  adminRole: string;
  assignState: string;
  stateAssigned: any;
  statewide: any;
  statewideCount: any;
  stateInfo: any
  loading: boolean = true;
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.adminRole = this.authService.currentUserValue.role;
    this.assignState = this.authService.currentUserValue.assign_state;
  }

  ngOnInit(): void {
    this.loading = true;
    console.log("Admin", this.adminRole);
    console.log("State:::", this.assignState);
    this.httpClient
      .get(<any>`${environment.apiUrl}/api/state/details/${this.assignState}`)
      .subscribe((state: any) => {
        console.log("State Information", state);

        this.stateAssigned = state.data.state_name;
        this.stateInfo = state.data;
        this.httpClient.get(`${environment.apiUrl}/api/enquiry`).subscribe((res: any) => {
          console.log("Enquriry Resp", res);
          this.loading = false;
          this.enqcount = res.data.length;
          this.statewide = res.data.filter((u: any) => {
            return u.post_code >= this.stateInfo.postcode_from && u.post_code <= this.stateInfo.postcode_to
          });
          this.statewideCount = this.statewide.length;
          console.log("statewide", this.statewide);

        })
      });


  }
  findStatewide(res, stateInfo) {
    console.log("Enquirycount", res);
    console.log("State Info.........", stateInfo);
    // localStorage.setItem('enquiryfreequeency', )


  }


}
