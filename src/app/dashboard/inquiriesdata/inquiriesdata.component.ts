import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inquiriesdata',
  templateUrl: './inquiriesdata.component.html',
  styleUrls: ['./inquiriesdata.component.sass']
})
export class InquiriesdataComponent implements OnInit {
  enquiries: any;
  enqcount: any;
  userInfo = JSON.parse(localStorage.getItem("currentUser"))
  stateInfo: any;
  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    let url = `${environment.apiUrl}/api/state/details/${this.userInfo.assign_state}`;
    this.http.get(url).subscribe((res: any) => {
      this.stateInfo = res.data;
      console.log("res", this.stateInfo);
    })
    this.http.get(`${environment.apiUrl}/api/enquiry`).subscribe((res: any) => {
      this.enquiries = res.data;

      this.enqcount = res.data.length;

    })


  }


}
