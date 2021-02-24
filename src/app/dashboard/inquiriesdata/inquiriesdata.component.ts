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

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    // http://15.206.94.199:4949/api/enquiry
    this.http.get(`${environment.apiUrl}/api/enquiry`).subscribe((res: any) => {
      console.log("Enquiries", res);
      this.enquiries = res.data;
      // this.totalOrders = res.data;
      this.enqcount = res.data.length;

    })
  }


}
