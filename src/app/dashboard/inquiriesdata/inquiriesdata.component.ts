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
  searchedKeyword: string;
  details: { postcode: number }[];
  filtered
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
      // console.log("Enquires response...", this.enquiries)
      this.filtered = this.enquiries.reduce((a, o) => (a.push({ postcode: o.post_code }), a), [])
      console.log("Filtered data...", this.filtered)
      this.enqchart(this.filtered);
    })


  }
  enqchart(arr) {
    console.log("got the object", arr);
    var output = Object.values(arr.reduce((obj, { postcode }) => {
      if (obj[postcode] === undefined)
        obj[postcode] = { postcode: postcode, occurrences: 1 };
      else
        obj[postcode].occurrences++;
      return obj;
    }, {}));
    console.log("Enquiries......", output);
    localStorage.setItem('enquirychart', JSON.stringify(output));
  }


}
